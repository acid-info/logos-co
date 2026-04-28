import { getLocale } from 'next-intl/server'

import { getPageCopy } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import { LogosMark } from '@repo/ui'

import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.circles

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

/**
 * Placeholder page — the real Circles UI (hero, world map, events list,
 * initiatives, resources) is rendered from `CirclesSettings` once the section
 * components are wired up. For now this just renders the page heading from
 * `content/pages/en/circles.json`.
 */
export default async function CirclesPage() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`CirclesPage received non-active locale "${rawLocale}"`)
  }
  const page = await getPageCopy(ROUTE, rawLocale)
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 flex items-center gap-3 text-brand-dark-green">
        <LogosMark size={40} className="shrink-0" />
        {page.heading ?? page.title}
      </h1>
    </div>
  )
}
