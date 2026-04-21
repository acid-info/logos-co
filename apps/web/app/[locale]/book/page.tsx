import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Book | Logos',
    description: 'The Logos book — foundational writings on decentralized civil society.',
    locale,
    path: ROUTES.book,
  })
}

export default function BookPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Book</h1>
    </div>
  )
}
