import { getLocale } from 'next-intl/server'

import { getPageCopy, resolvePressList } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  CardGridSection,
  CtaPanelSection,
  HeroSection,
  RelatedArticlesSection,
} from '@repo/content/schemas'

import StorageBuilderCta from '@/components/sections/storage/storage-builder-cta'
import StorageHero from '@/components/sections/storage/storage-hero'
import StorageMain from '@/components/sections/storage/storage-main'
import StorageRelatedArticles from '@/components/sections/storage/storage-related-articles'
import StorageTechStack from '@/components/sections/storage/storage-tech-stack'

import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.storage

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`generateMetadata received non-active locale "${locale}"`)
  }
  const page = await getPageCopy(ROUTE, locale)
  return createDefaultMetadata({
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? page.description,
    locale,
    path: ROUTE,
  })
}

const findSection = <T extends { componentType: string; key: string }>(
  sections: ReadonlyArray<{ componentType: string; key: string }>,
  componentType: T['componentType'],
  key: string,
): T => {
  const found = sections.find((s) => s.componentType === componentType && s.key === key)
  if (!found) {
    throw new Error(`storage page section not found: ${componentType} "${key}"`)
  }
  return found as T
}

/**
 * Four of five sections wired to PageCopy:
 *   - storage.hero            → StorageHero
 *   - storage.main            → StorageMain
 *   - storage.builderCta      → StorageBuilderCta
 *   - storage.relatedArticles → StorageRelatedArticles
 *
 * `StorageTechStack` is deferred: it composes the global techStackOverview
 * (shared with `/technology-stack`) with a storage-specific intro and per-card
 * body text (`pages.storage.techStack.*`). Migrating cleanly needs either a
 * cross-page shared partial or extra fields on `techStackOverview`. Until then
 * the component continues to read from `messages.en.json`.
 */
export default async function StoragePage() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`StoragePage received non-active locale "${rawLocale}"`)
  }
  const page = await getPageCopy(ROUTE, rawLocale)

  const hero = findSection<HeroSection>(page.sections, 'hero', 'storage.hero')
  const main = findSection<CtaPanelSection>(page.sections, 'ctaPanel', 'storage.main')
  const builderCta = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'storage.builderCta',
  )
  const relatedArticles = findSection<RelatedArticlesSection>(
    page.sections,
    'relatedArticles',
    'storage.relatedArticles',
  )

  const articles = await resolvePressList(relatedArticles.pinnedSlugs, {
    limit: relatedArticles.visibleCount ?? 4,
    locale: rawLocale,
  })

  return (
    <>
      <StorageHero data={hero} backHref={ROUTES.technologyStack} />
      <StorageMain data={main} />
      <StorageBuilderCta data={builderCta} />
      <StorageTechStack />
      <StorageRelatedArticles data={relatedArticles} articles={articles} />
    </>
  )
}
