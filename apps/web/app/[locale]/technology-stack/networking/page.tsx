import { getPageCopy, resolvePressList } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  CardGridSection,
  CtaPanelSection,
  HeroSection,
  RelatedArticlesSection,
} from '@repo/content/schemas'

import NetworkingBuilderCta from '@/components/sections/networking/networking-builder-cta'
import NetworkingFeatures from '@/components/sections/networking/networking-features'
import NetworkingHero from '@/components/sections/networking/networking-hero'
import NetworkingIntro from '@/components/sections/networking/networking-intro'
import NetworkingRelatedArticles from '@/components/sections/networking/networking-related-articles'
import TechStackExplorer from '@/components/sections/shared/tech-stack-explorer'

import { ROUTES } from '@/constants/routes'
import { createSectionFinder } from '@/lib/page-sections'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.networking

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

const findSection = createSectionFinder('networking')

export default async function NetworkingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`NetworkingPage received non-active locale "${locale}"`)
  }
  const page = await getPageCopy(ROUTE, locale)

  const hero = findSection<HeroSection>(page.sections, 'hero', 'networking.hero')
  const intro = findSection<CtaPanelSection>(
    page.sections,
    'ctaPanel',
    'networking.intro',
  )
  const features = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'networking.features',
  )
  const builderCta = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'networking.builderCta',
  )
  const relatedArticles = findSection<RelatedArticlesSection>(
    page.sections,
    'relatedArticles',
    'networking.relatedArticles',
  )

  const articles = await resolvePressList(relatedArticles.pinnedSlugs, {
    limit: relatedArticles.visibleCount ?? 4,
    locale,
  })

  return (
    <>
      <NetworkingHero data={hero} backHref={ROUTES.technologyStack} />
      <NetworkingIntro data={intro} />
      <NetworkingFeatures data={features} />
      <NetworkingBuilderCta data={builderCta} />
      <TechStackExplorer locale={locale} />
      <NetworkingRelatedArticles data={relatedArticles} articles={articles} />
    </>
  )
}
