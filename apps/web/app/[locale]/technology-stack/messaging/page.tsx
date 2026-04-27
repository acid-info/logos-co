import { getTranslations } from 'next-intl/server'

import MessagingBuilderCta from '@/components/sections/messaging/messaging-builder-cta'
import MessagingCaseStudies from '@/components/sections/messaging/messaging-case-studies'
import MessagingHero from '@/components/sections/messaging/messaging-hero'
import MessagingIntro from '@/components/sections/messaging/messaging-intro'
import MessagingRelatedArticles from '@/components/sections/messaging/messaging-related-articles'
import MessagingTechStack from '@/components/sections/messaging/messaging-tech-stack'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.messaging' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.messaging,
  })
}

export default function MessagingPage() {
  return (
    <>
      <MessagingHero />
      <MessagingIntro />
      <MessagingCaseStudies />
      <MessagingBuilderCta />
      <MessagingTechStack />
      <MessagingRelatedArticles />
    </>
  )
}
