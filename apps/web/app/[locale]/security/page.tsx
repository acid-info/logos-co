import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Security | Logos',
    description: 'Security policies, disclosures, and responsible reporting for Logos.',
    locale,
    path: ROUTES.security,
  })
}

export default function SecurityPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Security</h1>
    </div>
  )
}
