import {
  findOpenPullRequestsTouchingPath,
  type PullRequestSummary,
} from '@repo/content/github'
import type { Payload } from 'payload'

export type ContentLockResult = {
  /** Open PRs from the live GitHub query. Authoritative. */
  pullRequests: PullRequestSummary[]
  /**
   * ContentChangeRequest rows in the local DB pointing at this path. May be
   * stale if a PR closed since the last webhook; reconcile with `pullRequests`.
   */
  changeRequests: Array<{
    id: string | number
    branchName: string
    pullRequestNumber: number | null
    pullRequestUrl: string | null
    status: string
    updatedAt: string
  }>
}

/**
 * Two-source lock check for the editor "is anyone else editing this record?"
 * banner. Returns both the live GitHub PR list and the locally cached CCR
 * rows so the Admin UI can surface the GitHub PR (always authoritative)
 * while still being able to link to the Payload CCR record for audit.
 *
 * Plan §6: "Lock data is cached in Payload DB and refreshed by webhook +
 * short-TTL pull on miss." The webhook side is Phase 4c; for now this
 * function always issues a fresh GitHub query.
 */
export const getContentLock = async ({
  payload,
  targetPath,
}: {
  payload: Payload
  targetPath: string
}): Promise<ContentLockResult> => {
  const [pullRequests, ccrs] = await Promise.all([
    findOpenPullRequestsTouchingPath(targetPath),
    payload.find({
      collection: 'content-change-requests',
      where: {
        and: [{ targetPath: { equals: targetPath } }, { status: { in: ['draft', 'open'] } }],
      },
      limit: 50,
    }),
  ])

  return {
    pullRequests,
    changeRequests: ccrs.docs.map((doc) => ({
      id: doc.id,
      branchName: doc.branchName,
      pullRequestNumber: doc.pullRequestNumber ?? null,
      pullRequestUrl: doc.pullRequestUrl ?? null,
      status: doc.status,
      updatedAt: doc.updatedAt,
    })),
  }
}
