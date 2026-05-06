import {
  getBuilderHubSettings,
  getBuilderResources,
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
import { createPageMetadata } from '@/lib/page-metadata'

const ROUTE = ROUTES.buildersHub

export const generateMetadata = createPageMetadata(ROUTE)

export default async function BuildersHubPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`BuildersHubPage received non-active locale "${locale}"`)
  }

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
