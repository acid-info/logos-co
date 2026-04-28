import { getTranslations } from 'next-intl/server'
import { LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.press' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.press,
  })
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.press' })
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 flex items-center gap-3 text-brand-dark-green">
        <LogosMark size={40} className="shrink-0" />
        {t('heading')}
      </h1>
    </div>
  )
}
