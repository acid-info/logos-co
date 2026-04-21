import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'About | Logos',
    description:
      'Logos is on a mission to revitalize Civil Society. A community of builders, activists, and change seekers contributing in a wide variety of ways.',
    locale,
    path: ROUTES.about,
  })
}

export default function AboutPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">
        Logos is on a mission to revitalize Civil Society.
      </h1>
    </div>
  )
}
