import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Work With Us | Logos',
    description: 'Open roles and ways to collaborate with the Logos team.',
    locale,
    path: ROUTES.workWithUs,
  })
}

export default function WorkWithUsPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Work With Us</h1>
    </div>
  )
}
