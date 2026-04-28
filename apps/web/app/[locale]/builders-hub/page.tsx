import { getLocale } from 'next-intl/server'

import {
  getBuilderHubSettings,
  getBuilderResources,
  getPageCopy,
  resolveBuilderHubHomeIdeas,
  resolveBuilderHubHomeRfps,
} from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'

import {
  BuildersHubActionPanels,
  BuildersHubAppInstall,
  BuildersHubHero,
  BuildersHubIdeasSection,
  BuildersHubOverviewLinks,
  BuildersHubResources,
  BuildersHubRfpsSection,
} from '@/components/sections/builders-hub'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.buildersHub

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

export default async function BuildersHubPage() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`BuildersHubPage received non-active locale "${rawLocale}"`)
  }
  const locale = rawLocale

  const [settings, rfpResolution, ideaResolution, resources] =
    await Promise.all([
      getBuilderHubSettings(locale),
      resolveBuilderHubHomeRfps(locale),
      resolveBuilderHubHomeIdeas(locale),
      getBuilderResources({ locale, status: 'published' }),
    ])

  return (
    <main className="bg-brand-off-white">
      <BuildersHubHero hero={settings.hero} />
      <BuildersHubOverviewLinks links={settings.overviewLinks} />
      <BuildersHubAppInstall data={settings.appInstall} />
      <BuildersHubRfpsSection
        settings={settings.rfpsSection}
        resolution={rfpResolution}
      />
      <BuildersHubIdeasSection
        settings={settings.ideasSection}
        ideas={ideaResolution.ideas}
      />
      <BuildersHubActionPanels
        panels={settings.actionPanels}
        officeHours={settings.officeHours}
      />
      <BuildersHubResources
        settings={settings.resourcesSection}
        resources={resources}
      />
    </main>
  )
}
