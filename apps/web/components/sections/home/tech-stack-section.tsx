import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Button, ButtonArrowIcon, LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

interface StackItemProps {
  label: string
  href: string
}

function StackCard({ label, href }: StackItemProps) {
  return (
    <a
      href={href}
      className="border-brand-dark-green/10 flex h-91.5 cursor-pointer items-center justify-center rounded-3xl border p-5 transition-colors hover:border-brand-dark-green/30"
    >
      <span className="text-subhead-sans flex items-center gap-2 text-brand-dark-green">
        <LogosMark size={14} className="shrink-0" />
        {label}
      </span>
    </a>
  )
}

function StackRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-brand-dark-green/10 hover:border-brand-dark-green/30 flex h-49 items-center justify-center overflow-hidden rounded-3xl border px-6 transition-colors">
      <p className="text-subhead-sans text-brand-dark-green text-center">
        {children}
      </p>
    </div>
  )
}

export default async function TechStackSection() {
  const t = await getTranslations('home.techStack')

  return (
    <section id="tech-stack" className="bg-brand-off-white py-20 md:py-32">
      <div className="mx-auto max-w-354 px-3">
        {/* Header row */}
        <div className="mb-6 flex items-start justify-between">
          <div className="relative h-18.75 w-26.75 overflow-hidden rounded-lg">
            <Image
              src="/images/home/build-bg.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <p className="text-mono-s max-w-56.5 text-center text-brand-dark-green">
            {t('tagline')}
          </p>
          <Button
            href={ROUTES.technologyStack}
            variant="link"
            icon={<ButtonArrowIcon />}
            className="transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>

        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-h1 text-brand-dark-green">{t('title')}</h2>
        </div>

        {/* 4-col grid */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StackCard label={t('storage')} href={ROUTES.storage} />
          <StackCard label={t('messaging')} href={ROUTES.messaging} />
          <StackCard label={t('blockchain')} href={ROUTES.blockchain} />
          <StackCard label={t('userModules')} href={ROUTES.technologyStack} />
        </div>

        {/* Full-width rows */}
        <div className="mt-3 space-y-3">
          <StackRow>{t('networkingStack')}</StackRow>
          <StackRow>{t('foundation')}</StackRow>
        </div>
      </div>
    </section>
  )
}
