import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { loadGithubConfigFromEnv, setGithubConfig } from '@repo/content/github'

import config from '@payload-config'

import {
  saveRfpAsPullRequest,
  type RfpDocLike,
} from '../../../../../services/content-workflow'

/**
 * POST /api/content-workflow/save-rfp-as-pr
 *
 * Body: `{ id: string }` — the Payload Rfp document id.
 *
 * Authenticates via the standard Payload session cookie. Loads the doc,
 * builds the fixture pair, and creates a draft PR on the configured base
 * branch. Responds with the PR URL on success.
 *
 * On error, returns the message verbatim so the Admin button can surface
 * field-level Zod failures (missing required field, invalid href, etc.) to
 * the editor without them having to dig in the network tab.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  let body: { id?: string }
  try {
    body = (await req.json()) as { id?: string }
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  if (!body.id) {
    return NextResponse.json({ error: 'missing "id"' }, { status: 400 })
  }

  // Configure GitHub access from env (token, owner/repo, base branch).
  // The CMS runtime is the trusted boundary — env-driven config is fine.
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

  let doc: RfpDocLike
  try {
    doc = (await payload.findByID({
      collection: 'rfps',
      id: body.id,
      depth: 0,
    })) as unknown as RfpDocLike
  } catch (err) {
    return NextResponse.json(
      {
        error: `failed to load Rfp ${body.id}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      },
      { status: 404 }
    )
  }

  try {
    const result = await saveRfpAsPullRequest({
      doc,
      payload,
      editor: {
        email: typeof user.email === 'string' ? user.email : undefined,
        payloadUserId: user.id,
      },
    })
    return NextResponse.json({
      branchName: result.branchName,
      pullRequestNumber: result.pullRequestNumber,
      pullRequestUrl: result.pullRequestUrl,
      commitSha: result.commitSha,
      contentChangeRequestId: result.contentChangeRequestId,
    })
  } catch (err) {
    // Zod validation errors land here with a useful field-level message.
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 422 }
    )
  }
}
