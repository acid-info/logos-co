import { getLocale } from 'next-intl/server'

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
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.technologyStack

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
    throw new Error(`technology-stack page section not found: ${componentType} "${key}"`)
  }
  return found as T
}

/**
 * Four of five sections wired to PageCopy. `tech-overview-hero` is still
 * deferred — its 4-string blurb pattern (introTop / introSide / introBody +
 * heading at four absolute desktop positions) does not fit the current
 * `hero` schema cleanly.
 */
export default async function TechnologyStackPage() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`TechnologyStackPage received non-active locale "${rawLocale}"`)
  }
  const page = await getPageCopy(ROUTE, rawLocale)

  // Sentinel — hero copy still reads from messages.en.json, but we want the
  // fixture to keep the section so a future schema update lands cleanly.
  findSection<HeroSection>(page.sections, 'hero', 'techStack.hero')

  const overview = findSection<TechStackOverviewSection>(
    page.sections,
    'techStackOverview',
    'techStack.overview',
  )
  const appInstall = findSection<GiantSwitchSection>(
    page.sections,
    'giantSwitch',
    'techStack.appInstall',
  )
  const modular = findSection<FeaturedTextSection>(
    page.sections,
    'featuredText',
    'techStack.modular',
  )
  const useCases = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'techStack.useCases',
  )

  return (
    <>
      <TechOverviewHero />
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
