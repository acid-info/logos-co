import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { loadGithubConfigFromEnv, setGithubConfig } from '@repo/content/github'

import config from '@payload-config'

import { getContentLock } from '../../../../../services/content-workflow'

/**
 * GET /api/content-workflow/lock?path=<repo-relative-path>
 *
 * Returns the live lock state for a given content fixture path. Combines:
 *  - the authoritative GitHub query for open PRs touching the path, and
 *  - the locally cached `content-change-requests` rows (may be stale until
 *    Phase 4c webhook reconciliation lands).
 *
 * Used by the Admin lock-banner component to warn editors when another PR
 * is already in flight on the same slug, and to surface the in-flight PR
 * link inline so they can open it without leaving the admin.
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const path = req.nextUrl.searchParams.get('path')
  if (!path) {
    return NextResponse.json(
      { error: 'missing "path" query param' },
      { status: 400 }
    )
  }

  try {
    setGithubConfig(loadGithubConfigFromEnv())
  } catch (err) {
    return NextResponse.json(
      {
        error: `GitHub config not loaded: ${
          err instanceof Error ? err.message : String(err)
        }`,
      },
      { status: 500 }
    )
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  }

  try {
    const lock = await getContentLock({ payload, targetPath: path })
    return NextResponse.json(lock)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    )
  }
}
