import { getPageCopy } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  CardGridSection,
  FeaturedTextSection,
  GallerySection,
  HeroSection,
  RelatedArticlesSection,
  TechStackOverviewSection,
} from '@repo/content/schemas'

import AboutSection from '@/components/sections/home/about-section'
import BuilderPortalSection from '@/components/sections/home/builder-portal-section'
import CirclesCtaSection from '@/components/sections/home/circles-cta-section'
import FeatureCardsSection from '@/components/sections/home/feature-cards-section'
import HeroSectionView from '@/components/sections/home/hero-section'
import MountainSection from '@/components/sections/home/mountain-section'
import ParallelSocietySection from '@/components/sections/home/parallel-society-section'
import PressSection from '@/components/sections/home/press-section'
import TechStackSection from '@/components/sections/home/tech-stack-section'
import UseCasesSection from '@/components/sections/home/use-cases-section'

import { ROUTES } from '@/constants/routes'
import { getLatestPressArticles } from '@/lib/press-engine'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.home

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
  key: string
): T => {
  const found = sections.find(
    (s) => s.componentType === componentType && s.key === key
  )
  if (!found) {
    throw new Error(`home page section not found: ${componentType} "${key}"`)
  }
  return found as T
}

/**
 * Eight of ten home sections wired to PageCopy. The remaining two
 * (about-section, builder-portal-section, feature-cards-section) keep using
 * `getTranslations` because their composite shapes do not fit any current
 * PageSection type cleanly:
 *
 *   - feature-cards-section : Build/Node/Circles cards each with 4 sub-rows
 *                             and a sticky-scroll layout (cardGrid + table-
 *                             style row data needs a new section type).
 *   - about-section         : large quote + image card + headline + body
 *                             composite (no matching schema; would need a
 *                             `quoteCard` type).
 *   - builder-portal-section: 4 example rows + 3 feature blurbs + use-case
 *                             banner — too rich for ctaPanel/cardGrid alone.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`HomePage received non-active locale "${locale}"`)
  }
  const page = await getPageCopy(ROUTE, locale)

  const hero = findSection<HeroSection>(page.sections, 'hero', 'home.atf')
  const techStack = findSection<TechStackOverviewSection>(
    page.sections,
    'techStackOverview',
    'home.techStack'
  )
  const useCases = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'home.useCases'
  )
  const parallelSocietyHeadline = findSection<FeaturedTextSection>(
    page.sections,
    'featuredText',
    'home.parallelSocietyHeadline'
  )
  const parallelSocietyGallery = findSection<GallerySection>(
    page.sections,
    'gallery',
    'home.parallelSociety'
  )
  const mountain = findSection<FeaturedTextSection>(
    page.sections,
    'featuredText',
    'home.mountain'
  )
  const press = findSection<RelatedArticlesSection>(
    page.sections,
    'relatedArticles',
    'home.press'
  )
  const circlesCta = findSection<FeaturedTextSection>(
    page.sections,
    'featuredText',
    'home.circlesCta'
  )

  const articles = await getLatestPressArticles(press.visibleCount ?? 4)

  return (
    <>
      <HeroSectionView data={hero} />
      <FeatureCardsSection />
      <AboutSection locale={locale} />
      <TechStackSection
        data={techStack}
        networkingHref={ROUTES.networking}
        foundationHref={ROUTES.technologyStack}
      />
      <UseCasesSection data={useCases} />
      <ParallelSocietySection
        headline={parallelSocietyHeadline}
        gallery={parallelSocietyGallery}
      />
      <BuilderPortalSection locale={locale} />
      <MountainSection data={mountain} />
      <PressSection data={press} articles={articles} />
      <CirclesCtaSection data={circlesCta} />
    </>
  )
}
