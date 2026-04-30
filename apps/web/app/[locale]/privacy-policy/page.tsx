import { getTranslations } from 'next-intl/server'

import { DocsPageShell } from '@/components/sections/shared/docs-page-shell'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.privacy' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.privacy,
  })
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.privacy' })

  return (
    <DocsPageShell activeKey="privacy">
      <h1 className="text-eyebrow w-full text-brand-dark-green">
        {t('heading')}
      </h1>
      <div className="text-mono-s w-full whitespace-pre-line text-brand-dark-green">
        {t('body')}
      </div>
    </DocsPageShell>
  )
}
