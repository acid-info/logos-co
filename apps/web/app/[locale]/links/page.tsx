import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Links | Logos',
    description: 'Curated links to Logos ecosystem projects and resources.',
    locale,
    path: ROUTES.links,
  })
}

export default function LinksPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Links</h1>
    </div>
  )
}
