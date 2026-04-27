import { assertActiveLocale } from '../locales/registry'
import {
  type Language,
  type PressArticleIndex,
  type PressArticleLocale,
  type PublishState,
  pressArticleIndexSchema,
  pressArticleLocaleSchema,
} from '../schemas/index'

import { contentPath, listDirectories, readJson } from './_fs'

const PRESS_ARTICLES_DIR = 'press/articles'
const DEFAULT_PRESS_VISIBLE_COUNT = 4

/**
 * View model for a press article — the locale-agnostic record merged with the
 * requested locale's copy. Loader callers (Navigation, RelatedArticles, the
 * homepage Press strip, the `/press` index) all consume this shape.
 */
export type PressArticle = PressArticleIndex & PressArticleLocale

type GetPressArticlesOptions = {
  locale: Language
  /** When set, only articles with this status are returned. */
  status?: PublishState
  /** Optional cap; applied after sorting. */
  limit?: number
}

const sortPressArticlesDesc = (a: PressArticle, b: PressArticle): number => {
  if (a.publishedAt !== b.publishedAt) {
    return b.publishedAt.localeCompare(a.publishedAt)
  }
  return a.slug.localeCompare(b.slug)
}

const loadPressArticle = async (
  slug: string,
  locale: Language,
): Promise<PressArticle> => {
  const indexPath = contentPath(PRESS_ARTICLES_DIR, slug, 'index.json')
  const localePath = contentPath(PRESS_ARTICLES_DIR, slug, `${locale}.json`)
  const [indexData, localeData] = await Promise.all([
    readJson(indexPath, pressArticleIndexSchema),
    readJson(localePath, pressArticleLocaleSchema),
  ])
  if (indexData.slug !== slug) {
    throw new Error(
      `press article slug mismatch: directory "${slug}" but index.json says "${indexData.slug}"`,
    )
  }
  return { ...indexData, ...localeData }
}

export const getPressArticles = async ({
  locale,
  status,
  limit,
}: GetPressArticlesOptions): Promise<PressArticle[]> => {
  assertActiveLocale(locale)
  const slugs = await listDirectories(contentPath(PRESS_ARTICLES_DIR))
  const articles = await Promise.all(slugs.map((slug) => loadPressArticle(slug, locale)))
  const filtered = status ? articles.filter((article) => article.status === status) : articles
  filtered.sort(sortPressArticlesDesc)
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
}

type ResolvePressListFallback = {
  limit: number
  locale: Language
  /** Defaults to `'published'` since the resolved list is always rendered. */
  status?: PublishState
}

/**
 * Single helper used by every surface that takes a list of press articles.
 *
 * - Pinned slugs come first, in author-supplied order.
 * - Remaining slots are filled with the most recently published articles
 *   that are not already pinned.
 * - The total returned never exceeds `fallback.limit`.
 */
export const resolvePressList = async (
  pinnedSlugs: readonly string[] | undefined,
  fallback: ResolvePressListFallback,
): Promise<PressArticle[]> => {
  const status = fallback.status ?? 'published'
  const all = await getPressArticles({ locale: fallback.locale, status })
  const bySlug = new Map(all.map((article) => [article.slug, article]))

  const pinned: PressArticle[] = []
  for (const slug of pinnedSlugs ?? []) {
    const match = bySlug.get(slug)
    if (match) pinned.push(match)
  }
  const seen = new Set(pinned.map((article) => article.slug))

  const fill = all
    .filter((article) => !seen.has(article.slug))
    .slice(0, Math.max(0, fallback.limit - pinned.length))

  return [...pinned, ...fill].slice(0, fallback.limit)
}

export { DEFAULT_PRESS_VISIBLE_COUNT }
