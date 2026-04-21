import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Terms & Conditions | Logos',
    description: 'Terms and conditions for using the Logos website and services.',
    locale,
    path: ROUTES.terms,
  })
}

export default function TermsPage() {
  return (
    <div className="px-3 pt-16 pb-12">
      <h1 className="text-h2 text-brand-dark-green">Terms &amp; Conditions</h1>
    </div>
  )
}
