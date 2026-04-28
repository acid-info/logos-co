import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/rest'

import { getGithubConfig } from './config'

/**
 * Cached Octokit per auth mode so token rotation / installation refresh logic
 * does not reset on every call. Apps-mode auth tokens auto-rotate inside the
 * created instance via `@octokit/auth-app`.
 */
let cached: Octokit | null = null

/**
 * Build an authenticated Octokit. Resolution order:
 *   1. GitHub App installation auth (`GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`,
 *      `GITHUB_INSTALLATION_ID`) — preferred for staging / production.
 *   2. PAT fallback (`GITHUB_TOKEN`) — local dev only.
 *
 * Throws when neither set of credentials is provided.
 */
export const getOctokit = (): Octokit => {
  if (cached) return cached
  const config = getGithubConfig()

  if (config.appId && config.appPrivateKey && config.installationId) {
    cached = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: config.appId,
        privateKey: config.appPrivateKey,
        installationId: config.installationId,
      },
    })
    return cached
  }

  if (config.token) {
    cached = new Octokit({ auth: config.token })
    return cached
  }

  throw new Error(
    'GitHub auth not configured. Set either ' +
      '(GITHUB_APP_ID + GITHUB_APP_PRIVATE_KEY + GITHUB_INSTALLATION_ID) ' +
      'for App auth, or GITHUB_TOKEN for PAT auth (local dev only).',
  )
}

/**
 * Test-only helper. Production code should not reset the client at runtime.
 */
export const __resetOctokitForTests = (): void => {
  cached = null
}
