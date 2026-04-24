import { getTranslations } from 'next-intl/server'

import NetworkingBuilderCta from '@/components/sections/networking/networking-builder-cta'
import NetworkingFeatures from '@/components/sections/networking/networking-features'
import NetworkingHero from '@/components/sections/networking/networking-hero'
import NetworkingIntro from '@/components/sections/networking/networking-intro'
import NetworkingRelatedArticles from '@/components/sections/networking/networking-related-articles'
import TechStackExplorer from '@/components/sections/shared/tech-stack-explorer'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.networking' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.networking,
  })
}

export default function NetworkingPage() {
  return (
    <>
      <NetworkingHero />
      <NetworkingIntro />
      <NetworkingFeatures />
      <NetworkingBuilderCta />
      <TechStackExplorer />
      <NetworkingRelatedArticles />
    </>
  )
}
