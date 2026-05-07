import { getPageCopy } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  CardGridSection,
  FeaturedTextSection,
  GiantSwitchSection,
  HeroSection,
  TechStackOverviewSection,
} from '@repo/content/schemas'

import TechOverviewHero from '@/components/sections/technology-stack/tech-overview-hero'
import TechOverviewLogosApp from '@/components/sections/technology-stack/tech-overview-logos-app'
import TechOverviewModular from '@/components/sections/technology-stack/tech-overview-modular'
import TechOverviewStack from '@/components/sections/technology-stack/tech-overview-stack'
import TechOverviewUseCases from '@/components/sections/technology-stack/tech-overview-use-cases'
import { ROUTES } from '@/constants/routes'
import { createPageMetadata } from '@/lib/page-metadata'
import { createSectionFinder } from '@/lib/page-sections'

const ROUTE = ROUTES.technologyStack

export const generateMetadata = createPageMetadata(ROUTE)

const findSection = createSectionFinder('technology-stack')

/**
 * Four of five sections wired to PageCopy. `tech-overview-hero` is still
 * deferred — its 4-string blurb pattern (introTop / introSide / introBody +
 * heading at four absolute desktop positions) does not fit the current
 * `hero` schema cleanly.
 */
export default async function TechnologyStackPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(
      `TechnologyStackPage received non-active locale "${locale}"`
    )
  }
  const page = await getPageCopy(ROUTE, locale)

  // Sentinel — hero copy still reads from messages.en.json, but we want the
  // fixture to keep the section so a future schema update lands cleanly.
  findSection<HeroSection>(page.sections, 'hero', 'techStack.hero')

  const overview = findSection<TechStackOverviewSection>(
    page.sections,
    'techStackOverview',
    'techStack.overview'
  )
  const appInstall = findSection<GiantSwitchSection>(
    page.sections,
    'giantSwitch',
    'techStack.appInstall'
  )
  const modular = findSection<FeaturedTextSection>(
    page.sections,
    'featuredText',
    'techStack.modular'
  )
  const useCases = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'techStack.useCases'
  )

  return (
    <>
      <TechOverviewHero locale={locale} />
      <TechOverviewStack
        data={overview}
        networkingHref={ROUTES.networking}
        foundationHref={ROUTE}
      />
      <TechOverviewLogosApp data={appInstall} />
      <TechOverviewModular data={modular} />
      <TechOverviewUseCases data={useCases} />
    </>
  )
}
