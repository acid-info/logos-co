import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Press | Logos',
    description:
      'The Logos Press Engine — essays, news, and podcasts from the Logos movement.',
    locale,
    path: ROUTES.press,
  })
}

export default function PressPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">The Logos Press Engine</h1>
    </div>
  )
}
