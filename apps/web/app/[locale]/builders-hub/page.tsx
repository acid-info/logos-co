import { getTranslations } from 'next-intl/server'

import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.buildersHub' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.buildersHub,
  })
}

export default async function BuildersHubPage() {
  const t = await getTranslations('pages.buildersHub')
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">{t('heading')}</h1>
    </div>
  )
}
