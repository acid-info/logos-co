import {
  type FileChange,
  commitFiles,
  createBranch,
  createOrGetPullRequest,
  getGithubConfig,
} from '@repo/content/github'
import type { Payload } from 'payload'

import { buildContentBranchName } from './branch-naming'

export type SaveAsPullRequestInput = {
  /** Logical content type — used for branch naming and the CCR row. */
  contentType: string
  /**
   * Record identifier (slug or route) used in the branch name. The actual
   * file path is supplied in `changes`; this is for branch-naming only.
   */
  identifier: string
  /**
   * One or more file changes to commit in a single atomic GitHub commit.
   * The first change's `path` becomes the `targetPath` recorded on the
   * ContentChangeRequest row (used for lock queries).
   */
  changes: FileChange[]
  /** Single-line commit subject. */
  commitMessage: string
  /** PR title. Plan §9 PR Title Rules — should start with `content(scope):`. */
  prTitle: string
  /** PR body (markdown). The submitter line is appended automatically. */
  prBody?: string
  /** Open the PR as a draft (recommended for first-cut wiring). */
  draft?: boolean
  /**
   * Editor metadata. Surface code passes `req.user.email` etc. so the PR
   * description can attribute the change without writing the email into the
   * Git commit author (commits stay App-identity).
   */
  editor?: {
    email?: string
    payloadUserId?: string | number
    payloadAuditUrl?: string
  }
  /**
   * Override for tests / preview-only flows. Defaults to the Payload
   * instance the caller already holds. The payload arg is required so the
   * service can persist a `ContentChangeRequest` row.
   */
  payload: Payload
}

export type SaveAsPullRequestResult = {
  branchName: string
  pullRequestNumber: number
  pullRequestUrl: string
  commitSha: string
  contentChangeRequestId: string | number
}

/**
 * Single entry point that the Payload `Create PR` action calls.
 *
 *   1. Fork a fresh `content/...` branch off the configured base.
 *   2. Atomic-commit the JSON (and any media) into that branch.
 *   3. Open (or fetch existing) PR targeting the base branch.
 *   4. Upsert the `ContentChangeRequest` row that mirrors the PR state.
 *
 * Idempotent within a single editor save: re-running with the same identifier
 * + commit content produces a new branch (timestamp differs); re-running the
 * Create PR action against an existing CCR row should go through `commitToExistingBranch`
 * instead (4b.3 follow-up).
 */
export const saveAsPullRequest = async (
  input: SaveAsPullRequestInput,
): Promise<SaveAsPullRequestResult> => {
  if (input.changes.length === 0) {
    throw new Error('saveAsPullRequest requires at least one file change')
  }

  const config = getGithubConfig()
  const branchName = buildContentBranchName({
    contentType: input.contentType,
    identifier: input.identifier,
  })
  const baseBranch = config.prBaseBranch

  await createBranch({ newBranch: branchName, fromBranch: baseBranch })

  const { commitSha } = await commitFiles({
    branch: branchName,
    message: input.commitMessage,
    changes: input.changes,
  })

  const submitterLine = input.editor?.email
    ? `\n\n---\nSubmitted via Logos CMS by ${input.editor.email}.${
        input.editor.payloadAuditUrl
          ? `\nAudit log: ${input.editor.payloadAuditUrl}.`
          : ''
      }`
    : ''
  const pr = await createOrGetPullRequest({
    branchName,
    title: input.prTitle,
    body: (input.prBody ?? '') + submitterLine,
    draft: input.draft ?? true,
  })

  const targetPath = input.changes[0]!.path
  const created = await input.payload.create({
    collection: 'content-change-requests',
    data: {
      contentType: input.contentType,
      targetPath,
      branchName,
      pullRequestNumber: pr.number,
      pullRequestUrl: pr.htmlUrl,
      status: 'open',
      commitSha,
      ...(input.editor?.payloadUserId !== undefined && {
        createdBy: input.editor.payloadUserId,
      }),
    },
  })

  return {
    branchName,
    pullRequestNumber: pr.number,
    pullRequestUrl: pr.htmlUrl,
    commitSha,
    contentChangeRequestId: created.id,
  }
}
