import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Privacy Policy | Logos',
    description: 'How Logos handles your personal data and privacy.',
    locale,
    path: ROUTES.privacy,
  })
}

export default function PrivacyPolicyPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Privacy Policy</h1>
    </div>
  )
}
