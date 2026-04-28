import { getLocale } from 'next-intl/server'

import { getPageCopy, resolvePressList } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
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
  key: string,
): T => {
  const found = sections.find((s) => s.componentType === componentType && s.key === key)
  if (!found) {
    throw new Error(`home page section not found: ${componentType} "${key}"`)
  }
  return found as T
}

/**
 * Three of ten home sections wired to PageCopy:
 *   - home.atf       → HeroSectionView      (hero)
 *   - home.techStack → TechStackSection     (techStackOverview)
 *   - home.press     → PressSection         (relatedArticles + resolvePressList)
 *
 * Seven sections still source copy from `messages.en.json` because their
 * shapes do not fit the current PageSection types cleanly:
 *   - feature-cards-section   : multi-row "table" cards (Build / Node / Circles
 *                               with 4 example rows each + sticky-scroll layout)
 *   - about-section           : quote + image card + headline + body composite
 *   - use-cases-section       : tagline + tagline2 split across two desktop
 *                               coordinates plus per-card image variants and
 *                               a client-side carousel
 *   - parallel-society-section: highlighted-word headline + cta + 4 gallery
 *                               items with positional widths/heights
 *   - builder-portal-section  : 4 example rows + 3 feature blurbs + use-case
 *                               banner — too rich for ctaPanel/cardGrid alone
 *   - mountain-section        : highlighted-word title + cta (same pattern as
 *                               the deferred /technology-stack modular section)
 *   - circles-cta-section     : "19 Circles and Counting." with yellow accent
 *                               number prefix + dual CTAs (find / start)
 *
 * Migrating these cleanly will need new schema types (`featuredText`,
 * `quoteCard`) or extensions (`cardGrid.subheadingExtra`, multi-CTA on
 * ctaPanel). Out of scope for this step.
 */
export default async function HomePage() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`HomePage received non-active locale "${rawLocale}"`)
  }
  const page = await getPageCopy(ROUTE, rawLocale)

  const hero = findSection<HeroSection>(page.sections, 'hero', 'home.atf')
  const techStack = findSection<TechStackOverviewSection>(
    page.sections,
    'techStackOverview',
    'home.techStack',
  )
  const press = findSection<RelatedArticlesSection>(
    page.sections,
    'relatedArticles',
    'home.press',
  )

  const articles = await resolvePressList(press.pinnedSlugs, {
    limit: press.visibleCount ?? 4,
    locale: rawLocale,
  })

  return (
    <>
      <HeroSectionView data={hero} />
      <FeatureCardsSection />
      <AboutSection />
      <TechStackSection
        data={techStack}
        networkingHref={ROUTES.networking}
        foundationHref={ROUTES.technologyStack}
      />
      <UseCasesSection />
      <ParallelSocietySection />
      <BuilderPortalSection />
      <MountainSection />
      <PressSection data={press} articles={articles} />
      <CirclesCtaSection />
    </>
  )
}
