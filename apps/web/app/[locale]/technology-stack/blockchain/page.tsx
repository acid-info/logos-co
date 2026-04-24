import { getTranslations } from 'next-intl/server'

import BlockchainBuilderCta from '@/components/sections/blockchain/blockchain-builder-cta'
import BlockchainCryptarchia from '@/components/sections/blockchain/blockchain-cryptarchia'
import BlockchainHero from '@/components/sections/blockchain/blockchain-hero'
import BlockchainPrivacy from '@/components/sections/blockchain/blockchain-privacy'
import BlockchainRelatedArticles from '@/components/sections/blockchain/blockchain-related-articles'
import TechStackExplorer from '@/components/sections/shared/tech-stack-explorer'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.blockchain' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.blockchain,
  })
}

export default function BlockchainPage() {
  return (
    <>
      <BlockchainHero />
      <BlockchainPrivacy />
      <BlockchainCryptarchia />
      <BlockchainBuilderCta />
      <TechStackExplorer />
      <BlockchainRelatedArticles />
    </>
  )
}
