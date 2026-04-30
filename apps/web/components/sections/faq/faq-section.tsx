import { getTranslations } from 'next-intl/server'

import { DocsPageShell } from '@/components/sections/shared/docs-page-shell'

import { FaqAccordion, type FaqItem } from './faq-accordion'

/**
 * FAQ page main content. Reuses the shared DocsPageShell (left ToC +
 * right content column). See docs-page-shell.tsx for the Figma references.
 */

const ITEM_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const

export async function FaqSection() {
  const t = await getTranslations('pages.faq')

  const items: ReadonlyArray<FaqItem> = ITEM_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }))

  return (
    <DocsPageShell activeKey="faq">
      <h1 className="text-eyebrow w-full text-brand-dark-green">
        {t('heading')}
      </h1>
      <FaqAccordion items={items} />
    </DocsPageShell>
  )
}
