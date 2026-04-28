import { ideaIndexSchema, ideaLocaleSchema } from '@repo/content/schemas'
import type { FileChange } from '@repo/content/github'
import type { Payload } from 'payload'

import { saveAsPullRequest, type SaveAsPullRequestResult } from './save-as-pr'

/**
 * Shape of an Idea doc as Payload returns it from `payload.findByID`.
 * Mirrors the collection field config in `apps/cms/src/collections/Ideas.ts`.
 */
export type IdeaDocLike = {
  slug: string
  status: 'draft' | 'review' | 'published' | 'archived'
  title: string
  tagline?: string | null
  summary: string
  description: string
  ctaLabel?: string | null
  submitterName?: string | null
  submitterHandle: string
  rewardAmount?: number | null
  rewardCurrency?: 'USDC' | null
  rewardXp?: number | null
  discussionUrl?: string | null
  tags?: string[] | null
  featured?: boolean | null
  order?: number | null
  submittedAt?: string | null
}

const stripEmpty = <T extends Record<string, unknown>>(obj: T): T => {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue
    if (Array.isArray(v) && v.length === 0) continue
    out[k] = v
  }
  return out as T
}

const toIsoDateOrUndefined = (
  raw: string | null | undefined
): string | undefined => {
  if (!raw) return undefined
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString()
}

/**
 * Maps a Payload Idea document to the locale-agnostic `index.json` shape and
 * the per-locale `<lang>.json` shape, then Zod-validates each. Reward is
 * built only when an amount is provided — keeps the published fixture lean.
 */
export const buildIdeaFixtureChanges = (
  doc: IdeaDocLike
): { indexChange: FileChange; localeChange: FileChange } => {
  const targetDir = `content/builders-hub/ideas/${doc.slug}`

  const reward =
    typeof doc.rewardAmount === 'number' && doc.rewardAmount > 0
      ? stripEmpty({
          amount: doc.rewardAmount,
          currency: doc.rewardCurrency ?? 'USDC',
          xp: doc.rewardXp ?? undefined,
        })
      : undefined

  const indexCandidate = stripEmpty({
    schemaVersion: 1,
    slug: doc.slug,
    status: doc.status,
    submitter: stripEmpty({
      name: doc.submitterName ?? undefined,
      handle: doc.submitterHandle,
    }),
    reward,
    tags: doc.tags ?? [],
    featured: doc.featured ?? false,
    order: doc.order ?? undefined,
    submittedAt: toIsoDateOrUndefined(doc.submittedAt),
    discussionUrl: doc.discussionUrl ?? undefined,
  })

  const localeCandidate = stripEmpty({
    language: 'en',
    title: doc.title,
    tagline: doc.tagline ?? undefined,
    summary: doc.summary,
    description: doc.description,
    ctaLabel: doc.ctaLabel ?? undefined,
  })

  const indexParsed = ideaIndexSchema.parse(indexCandidate)
  const localeParsed = ideaLocaleSchema.parse(localeCandidate)

  return {
    indexChange: {
      path: `${targetDir}/index.json`,
      content: JSON.stringify(indexParsed, null, 2) + '\n',
    },
    localeChange: {
      path: `${targetDir}/en.json`,
      content: JSON.stringify(localeParsed, null, 2) + '\n',
    },
  }
}

export const saveIdeaAsPullRequest = async ({
  doc,
  payload,
  editor,
}: {
  doc: IdeaDocLike
  payload: Payload
  editor?: {
    email?: string
    payloadUserId?: string | number
    payloadAuditUrl?: string
  }
}): Promise<SaveAsPullRequestResult> => {
  const { indexChange, localeChange } = buildIdeaFixtureChanges(doc)

  return saveAsPullRequest({
    contentType: 'idea',
    identifier: doc.slug,
    changes: [indexChange, localeChange],
    commitMessage: `content(idea): update ${doc.slug}`,
    prTitle: `content(idea): update ${doc.slug}`,
    prBody: [
      `Updates the **${doc.title}** Idea fixture from the CMS Admin.`,
      '',
      `- slug: \`${doc.slug}\``,
      `- status: \`${doc.status}\``,
      `- submitter: @${doc.submitterHandle}${doc.submitterName ? ` (${doc.submitterName})` : ''}`,
    ].join('\n'),
    draft: true,
    editor,
    payload,
  })
}
