import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Take Action | Logos',
    description: 'Ways to contribute to the Logos movement.',
    locale,
    path: ROUTES.takeAction,
  })
}

export default function TakeActionPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Take Action</h1>
    </div>
  )
}
