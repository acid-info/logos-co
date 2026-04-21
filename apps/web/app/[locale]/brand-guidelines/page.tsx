import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Brand Guidelines | Logos',
    description: 'The Logos brand identity — logo usage, color palette, typography, and voice.',
    locale,
    path: ROUTES.brandGuidelines,
  })
}

export default function BrandGuidelinesPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Brand Guidelines</h1>
    </div>
  )
}
