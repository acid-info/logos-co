import { getTranslations } from 'next-intl/server'

import { LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

type StackCardProps = {
  label: string
  href: string
}

function StackCard({ label, href }: StackCardProps) {
  return (
    <a
      href={href}
      className="border-brand-dark-green/50 flex h-[258px] items-center justify-center rounded-3xl border transition-colors hover:border-brand-dark-green"
    >
      <span className="text-subhead-sans flex items-center gap-2 text-brand-dark-green">
        <LogosMark size={14} className="shrink-0" />
        {label}
      </span>
    </a>
  )
}

function StackRow({ label, href }: StackCardProps) {
  return (
    <a
      href={href}
      className="border-brand-dark-green/50 hover:border-brand-dark-green flex h-[196px] items-center justify-center rounded-3xl border px-6 text-center transition-colors"
    >
      <span className="text-subhead-sans max-w-[290px] text-brand-dark-green md:max-w-none">
        {label}
      </span>
    </a>
  )
}

export default async function TechOverviewStack() {
  const t = await getTranslations('pages.technologyStack.stack')

  return (
    <section className="bg-brand-off-white px-3 pb-10 md:pb-10">
      <div className="mx-auto max-w-354">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StackCard label={t('storage')} href={ROUTES.storage} />
          <StackCard label={t('messaging')} href={ROUTES.messaging} />
          <StackCard label={t('blockchain')} href={ROUTES.blockchain} />
          <StackCard label={t('userModules')} href={ROUTES.technologyStack} />
        </div>

        <div className="mt-3 space-y-3">
          <StackRow label={t('networking')} href={ROUTES.networking} />
          <StackRow label={t('foundation')} href={ROUTES.technologyStack} />
        </div>
      </div>
    </section>
  )
}
