import { getTranslations } from 'next-intl/server'

import StorageBuilderCta from '@/components/sections/storage/storage-builder-cta'
import StorageHero from '@/components/sections/storage/storage-hero'
import StorageMain from '@/components/sections/storage/storage-main'
import StorageRelatedArticles from '@/components/sections/storage/storage-related-articles'
import StorageTechStack from '@/components/sections/storage/storage-tech-stack'

import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.storage' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.storage,
  })
}

export default function StoragePage() {
  return (
    <>
      <StorageHero />
      <StorageMain />
      <StorageBuilderCta />
      <StorageTechStack />
      <StorageRelatedArticles />
    </>
  )
}
