import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Blog | Logos',
    description: 'Essays, updates, and technical writing from the Logos team.',
    locale,
    path: ROUTES.blog,
  })
}

export default function BlogPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Blog</h1>
    </div>
  )
}
