import { getTranslations } from 'next-intl/server'

import { LogosMark } from '@repo/ui'

import { ROUTES } from '@/constants/routes'
import { routing } from '@/i18n/routing'
import { createDefaultMetadata } from '@/utils/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [{ locale, slug: 'global' }])
}

function slugToCity(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'pages.circleDetail' })
  const city = slugToCity(slug)
  return createDefaultMetadata({
    title: t('title', { city }),
    description: t('description', { city }),
    locale,
    path: ROUTES.circle(slug),
  })
}

export default async function CircleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = await getTranslations('pages.circleDetail')
  const city = slugToCity(slug)
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 flex items-center gap-3 text-brand-dark-green">
        <LogosMark size={40} className="shrink-0" />
        {t('heading', { city })}
      </h1>
    </div>
  )
}
