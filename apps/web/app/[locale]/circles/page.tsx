import {
  getCircleEventsGroupedByDate,
  getCircleInitiatives,
  getCircleResources,
  getCircles,
  getCirclesSettings,
  getPageCopy,
} from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'

import { CirclesPageView } from '@/components/sections/circles'
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

export default async function CirclesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`CirclesPage received non-active locale "${locale}"`)
  }

  const [settings, circles, eventGroups, initiatives, resources] =
    await Promise.all([
      getCirclesSettings(locale),
      getCircles({ locale, status: 'published' }),
      getCircleEventsGroupedByDate({ locale, status: 'published' }),
      getCircleInitiatives({ locale, status: 'published' }),
      getCircleResources({ locale, status: 'published' }),
    ])

  return (
    <CirclesPageView
      settings={settings}
      circles={circles}
      eventGroups={eventGroups}
      initiatives={initiatives}
      resources={resources}
      locale={locale}
    />
  )
}
