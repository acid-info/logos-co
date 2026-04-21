import { getTranslations } from 'next-intl/server'

import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.technologyStack' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.technologyStack,
  })
}

export default async function TechnologyStackPage() {
  const t = await getTranslations('pages.technologyStack')
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">{t('heading')}</h1>
    </div>
  )
}
