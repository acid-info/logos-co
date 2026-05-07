import { getPageCopy, resolvePressList } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  CardGridSection,
  CtaPanelSection,
  HeroSection,
  RelatedArticlesSection,
} from '@repo/content/schemas'

import MessagingBuilderCta from '@/components/sections/messaging/messaging-builder-cta'
import MessagingCaseStudies from '@/components/sections/messaging/messaging-case-studies'
import MessagingHero from '@/components/sections/messaging/messaging-hero'
import MessagingIntro from '@/components/sections/messaging/messaging-intro'
import MessagingRelatedArticles from '@/components/sections/messaging/messaging-related-articles'
import MessagingTechStack from '@/components/sections/messaging/messaging-tech-stack'
import { ROUTES } from '@/constants/routes'
import { createPageMetadata } from '@/lib/page-metadata'
import { createSectionFinder } from '@/lib/page-sections'

const ROUTE = ROUTES.messaging

export const generateMetadata = createPageMetadata(ROUTE)

const findSection = createSectionFinder('messaging')

/**
 * Five of six sections wired to PageCopy:
 *   - messaging.hero            → MessagingHero
 *   - messaging.privacy + lmn   → MessagingIntro (one component, two ctaPanel sections)
 *   - messaging.caseStudies     → MessagingCaseStudies
 *   - messaging.builderCta      → MessagingBuilderCta
 *   - messaging.relatedArticles → MessagingRelatedArticles
 *
 * `MessagingTechStack` is deferred (same rationale as `StorageTechStack`):
 * it composes the global techStackOverview with messaging-specific intro
 * copy. Migration awaits either a cross-page shared partial or extra fields
 * on `techStackOverview`.
 */
export default async function MessagingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`MessagingPage received non-active locale "${locale}"`)
  }
  const page = await getPageCopy(ROUTE, locale)

  const hero = findSection<HeroSection>(page.sections, 'hero', 'messaging.hero')
  const privacy = findSection<CtaPanelSection>(
    page.sections,
    'ctaPanel',
    'messaging.privacy'
  )
  const lmn = findSection<CtaPanelSection>(
    page.sections,
    'ctaPanel',
    'messaging.lmn'
  )
  const caseStudies = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'messaging.caseStudies'
  )
  const builderCta = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'messaging.builderCta'
  )
  const relatedArticles = findSection<RelatedArticlesSection>(
    page.sections,
    'relatedArticles',
    'messaging.relatedArticles'
  )

  const articles = await resolvePressList(relatedArticles.pinnedSlugs, {
    limit: relatedArticles.visibleCount ?? 4,
    locale,
  })

  return (
    <>
      <MessagingHero data={hero} backHref={ROUTES.technologyStack} />
      <MessagingIntro privacy={privacy} lmn={lmn} />
      <MessagingCaseStudies data={caseStudies} />
      <MessagingBuilderCta data={builderCta} />
      <MessagingTechStack locale={locale} />
      <MessagingRelatedArticles data={relatedArticles} articles={articles} />
    </>
  )
}
