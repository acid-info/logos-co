import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

function TextLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-semibold uppercase leading-[1.35] transition-opacity hover:opacity-70"
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
        <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  )
}

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
      <span className="flex items-center gap-2 font-sans text-[18px] font-normal leading-[1.15] tracking-[-0.01em] text-brand-dark-green">
        <LogosMark size={14} className="shrink-0" />
        {label}
      </span>
    </a>
  )
}

function StackRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-brand-dark-green/10 hover:border-brand-dark-green/30 flex h-49 items-center justify-center overflow-hidden rounded-3xl border px-6 transition-colors">
      <p className="font-sans text-brand-dark-green text-center text-[18px] leading-[1.15] tracking-[-0.01em]">
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
            <Image src="/images/home/build-bg.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <p className="text-mono-s max-w-56.5 text-center text-brand-dark-green">
            {t('tagline')}
          </p>
          <TextLink href={ROUTES.technologyStack}>{t('cta')}</TextLink>
        </div>

        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-h1 text-brand-dark-green">{t('title')}</h2>
        </div>

        {/* 4-col grid */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StackCard label="Storage" href={ROUTES.storage} />
          <StackCard label="Messaging" href={ROUTES.messaging} />
          <StackCard label="Blockchain" href={ROUTES.blockchain} />
          <StackCard label="User Modules" href={ROUTES.technologyStack} />
        </div>

        {/* Full-width rows */}
        <div className="mt-3 space-y-3">
          <StackRow>The Networking Stack: Discovery, Peering, and Mix-Net</StackRow>
          <StackRow>The Foundation: Logos Kernel</StackRow>
        </div>
      </div>
    </section>
  )
}
