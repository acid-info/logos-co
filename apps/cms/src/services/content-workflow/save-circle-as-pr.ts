import { circleIndexSchema, circleLocaleSchema } from '@repo/content/schemas'
import type { FileChange } from '@repo/content/github'
import type { Payload } from 'payload'

import { saveAsPullRequest, type SaveAsPullRequestResult } from './save-as-pr'

/**
 * Shape of a Circle doc as Payload returns it from `payload.findByID`.
 * Mirrors the collection field config in `apps/cms/src/collections/Circles.ts`.
 *
 * Hand-typed (rather than imported from `@repo/types`) because the generated
 * Payload types are emitted from a build step that may lag the collection
 * during development.
 */
export type CircleDocLike = {
  slug: string
  status: 'draft' | 'review' | 'published' | 'archived'
  name: string
  description: string
  city: string
  country: string
  region?: string | null
  lat: number
  lng: number
  timezone: string
  memberCount?: number | null
  discordChannel?: string | null
  discordUrl?: string | null
  forumUrl?: string | null
  joinUrl: string
  imageSrc?: string | null
  imageAlt?: string | null
  imageWidth?: number | null
  imageHeight?: number | null
  organizers?: Array<{ name: string; handle?: string | null }> | null
  order?: number | null
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

/**
 * Maps a Payload Circle document to the locale-agnostic `index.json` shape and
 * the per-locale `<lang>.json` shape used by `@repo/content` loaders, then
 * Zod-validates each before they touch GitHub. Validation failure throws
 * here rather than at PR-open time, so the editor sees a precise error
 * before any branch is created.
 *
 * Field mapping notes:
 * - Flat `lat`/`lng` collapse into `coordinates: { lat, lng }`.
 * - Flat `imageSrc`/`imageAlt`/`imageWidth`/`imageHeight` collapse into
 *   `image: MediaRef`. The image block is omitted entirely when no `src` is
 *   set so the resulting fixture stays lean.
 * - `organizers` entries with no `handle` are normalised to `{ name }`.
 */
export const buildCircleFixtureChanges = (
  doc: CircleDocLike
): { indexChange: FileChange; localeChange: FileChange } => {
  const targetDir = `content/circles/circles/${doc.slug}`

  const image = doc.imageSrc
    ? stripEmpty({
        src: doc.imageSrc,
        alt: doc.imageAlt ?? '',
        width: doc.imageWidth ?? undefined,
        height: doc.imageHeight ?? undefined,
      })
    : undefined

  const organizers =
    doc.organizers && doc.organizers.length > 0
      ? doc.organizers.map((o) =>
          stripEmpty({ name: o.name, handle: o.handle ?? undefined })
        )
      : undefined

  const indexCandidate = stripEmpty({
    schemaVersion: 1,
    slug: doc.slug,
    status: doc.status,
    city: doc.city,
    country: doc.country,
    region: doc.region ?? undefined,
    coordinates: { lat: doc.lat, lng: doc.lng },
    timezone: doc.timezone,
    memberCount: doc.memberCount ?? undefined,
    discordChannel: doc.discordChannel ?? undefined,
    discordUrl: doc.discordUrl ?? undefined,
    forumUrl: doc.forumUrl ?? undefined,
    joinUrl: doc.joinUrl,
    image,
    organizers,
    order: doc.order ?? undefined,
  })

  const localeCandidate = stripEmpty({
    language: 'en',
    name: doc.name,
    description: doc.description,
  })

  const indexParsed = circleIndexSchema.parse(indexCandidate)
  const localeParsed = circleLocaleSchema.parse(localeCandidate)

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

/**
 * High-level entry point invoked by the Admin "Create PR" action. Takes the
 * Payload doc + the request's Payload instance and editor metadata, builds
 * the file-change pair, and delegates to `saveAsPullRequest`.
 */
export const saveCircleAsPullRequest = async ({
  doc,
  payload,
  editor,
}: {
  doc: CircleDocLike
  payload: Payload
  editor?: {
    email?: string
    payloadUserId?: string | number
    payloadAuditUrl?: string
  }
}): Promise<SaveAsPullRequestResult> => {
  const { indexChange, localeChange } = buildCircleFixtureChanges(doc)

  return saveAsPullRequest({
    contentType: 'circle',
    identifier: doc.slug,
    changes: [indexChange, localeChange],
    commitMessage: `content(circle): update ${doc.slug}`,
    prTitle: `content(circle): update ${doc.slug}`,
    prBody: [
      `Updates the **${doc.name}** Circle fixture from the CMS Admin.`,
      '',
      `- slug: \`${doc.slug}\``,
      `- status: \`${doc.status}\``,
      `- city: ${doc.city}, ${doc.country}`,
    ].join('\n'),
    draft: true,
    editor,
    payload,
  })
}
