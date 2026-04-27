import { z } from 'zod'

import {
  httpsUrlSchema,
  isoDateTimeSchema,
  languageSchema,
  mediaRefSchema,
  publishStateSchema,
  schemaVersion,
  slugSchema,
} from './common'

export const pressSourceSchema = z.enum(['logos-press-engine', 'external'])
export type PressSource = z.infer<typeof pressSourceSchema>

/**
 * Locale-agnostic press article record.
 * Stored at `content/press/articles/<slug>/index.json`.
 *
 * The CMS does not own article bodies. Long-form text lives in the Logos Press
 * Engine (or the external publication) and is reached via `externalUrl`.
 */
export const pressArticleIndexSchema = z.object({
  schemaVersion: schemaVersion(1),
  slug: slugSchema,
  status: publishStateSchema,
  publishedAt: isoDateTimeSchema,
  /** Optional override for surface-specific display, e.g. "02.14.26". */
  displayDate: z.string().min(1).optional(),
  author: z
    .object({
      name: z.string().min(1),
      handle: z.string().min(1).optional(),
    })
    .optional(),
  source: pressSourceSchema,
  externalUrl: httpsUrlSchema,
  image: mediaRefSchema,
  featured: z.boolean().optional(),
})
export type PressArticleIndex = z.infer<typeof pressArticleIndexSchema>

/**
 * Per-locale press article copy.
 * Stored at `content/press/articles/<slug>/<locale>.json`.
 */
export const pressArticleLocaleSchema = z.object({
  language: languageSchema,
  title: z.string().min(1),
  excerpt: z.string().min(1).optional(),
})
export type PressArticleLocale = z.infer<typeof pressArticleLocaleSchema>
