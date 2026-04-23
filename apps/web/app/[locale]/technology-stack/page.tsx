import { getTranslations } from 'next-intl/server'

import TechOverviewHero from '@/components/sections/technology-stack/tech-overview-hero'
import TechOverviewLogosApp from '@/components/sections/technology-stack/tech-overview-logos-app'
import TechOverviewModular from '@/components/sections/technology-stack/tech-overview-modular'
import TechOverviewStack from '@/components/sections/technology-stack/tech-overview-stack'
import TechOverviewUseCases from '@/components/sections/technology-stack/tech-overview-use-cases'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'pages.technologyStack',
  })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.technologyStack,
  })
}

export default function TechnologyStackPage() {
  return (
    <>
      <TechOverviewHero />
      <TechOverviewStack />
      <TechOverviewLogosApp />
      <TechOverviewModular />
      <TechOverviewUseCases />
    </>
  )
}
