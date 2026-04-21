import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'FAQ | Logos',
    description:
      'Frequently asked questions about Logos — what it is, how it works, and how to get involved.',
    locale,
    path: ROUTES.faq,
  })
}

export default function FaqPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">FAQ</h1>
    </div>
  )
}
