import { getLocale } from 'next-intl/server'

import { getPageCopy, resolvePressList } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  CardGridSection,
  CtaPanelSection,
  HeroSection,
  RelatedArticlesSection,
} from '@repo/content/schemas'

import BlockchainBuilderCta from '@/components/sections/blockchain/blockchain-builder-cta'
import BlockchainCryptarchia from '@/components/sections/blockchain/blockchain-cryptarchia'
import BlockchainHero from '@/components/sections/blockchain/blockchain-hero'
import BlockchainPrivacy from '@/components/sections/blockchain/blockchain-privacy'
import BlockchainRelatedArticles from '@/components/sections/blockchain/blockchain-related-articles'
import TechStackExplorer from '@/components/sections/shared/tech-stack-explorer'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.blockchain

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
    throw new Error(`blockchain page section not found: ${componentType} "${key}"`)
  }
  return found as T
}

export default async function BlockchainPage() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`BlockchainPage received non-active locale "${rawLocale}"`)
  }
  const page = await getPageCopy(ROUTE, rawLocale)

  const hero = findSection<HeroSection>(page.sections, 'hero', 'blockchain.hero')
  const privacy = findSection<CtaPanelSection>(
    page.sections,
    'ctaPanel',
    'blockchain.privacy',
  )
  const cryptarchia = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'blockchain.cryptarchia',
  )
  const builderCta = findSection<CardGridSection>(
    page.sections,
    'cardGrid',
    'blockchain.builderCta',
  )
  const relatedArticles = findSection<RelatedArticlesSection>(
    page.sections,
    'relatedArticles',
    'blockchain.relatedArticles',
  )

  const articles = await resolvePressList(relatedArticles.pinnedSlugs, {
    limit: relatedArticles.visibleCount ?? 4,
    locale: rawLocale,
  })

  return (
    <>
      <BlockchainHero data={hero} backHref={ROUTES.technologyStack} />
      <BlockchainPrivacy data={privacy} />
      <BlockchainCryptarchia data={cryptarchia} />
      <BlockchainBuilderCta data={builderCta} />
      <TechStackExplorer />
      <BlockchainRelatedArticles data={relatedArticles} articles={articles} />
    </>
  )
}
