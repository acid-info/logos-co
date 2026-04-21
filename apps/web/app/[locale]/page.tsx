import { getTranslations } from 'next-intl/server'

import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

import HeroSection from '@/components/sections/home/hero-section'
import FeatureCardsSection from '@/components/sections/home/feature-cards-section'
import AboutSection from '@/components/sections/home/about-section'
import TechStackSection from '@/components/sections/home/tech-stack-section'
import UseCasesSection from '@/components/sections/home/use-cases-section'
import ParallelSocietySection from '@/components/sections/home/parallel-society-section'
import BuilderPortalSection from '@/components/sections/home/builder-portal-section'
import MountainSection from '@/components/sections/home/mountain-section'
import PressSection from '@/components/sections/home/press-section'
import CirclesCtaSection from '@/components/sections/home/circles-cta-section'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.home' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.home,
  })
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureCardsSection />
      <AboutSection />
      <TechStackSection />
      <UseCasesSection />
      <ParallelSocietySection />
      <BuilderPortalSection />
      <MountainSection />
      <PressSection />
      <CirclesCtaSection />
    </>
  )
}
