import Image from 'next/image'

import type { TechStackOverviewSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'

import {
  StackCard,
  StackRow,
} from '@/components/sections/technology-stack/stack-item'

const cardClassName =
  'border-brand-dark-green/10 hover:border-brand-dark-green/30 h-91.5 p-5'
const rowClassName =
  'border-brand-dark-green/10 hover:border-brand-dark-green/30 h-49 overflow-hidden'

type Props = {
  data: TechStackOverviewSection
  /**
   * Where the networking row links to. Page-level concern (the section
   * fixture covers the four pillars; the networking row is a shared link
   * across pages).
   */
  networkingHref: string
  /** Where the foundation row links to. */
  foundationHref: string
}

export default function TechStackSection({
  data,
  networkingHref,
  foundationHref,
}: Props) {
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
          {data.eyebrow ? (
            <p className="text-mono-s max-w-56.5 text-center text-brand-dark-green">
              {data.eyebrow}
            </p>
          ) : null}
          {data.cta ? (
            <Button
              href={data.cta.href}
              variant="link"
              icon={<ButtonArrowIcon />}
              className="transition-opacity hover:opacity-70"
            >
              {data.cta.label}
            </Button>
          ) : null}
        </div>

        {/* Title */}
        {data.title ? (
          <div className="mb-10 text-center">
            <h2 className="text-h1 text-brand-dark-green">{data.title}</h2>
          </div>
        ) : null}

        {/* 4-col grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {data.pillars.map((pillar) => (
            <StackCard
              key={pillar.id}
              label={pillar.title}
              href={pillar.href}
              className={cardClassName}
            />
          ))}
        </div>

        {/* Full-width rows */}
        <div className="mt-3 space-y-3">
          <StackRow href={networkingHref} className={rowClassName}>
            {data.networkingTitle}
          </StackRow>
          <StackRow href={foundationHref} className={rowClassName}>
            {data.foundationTitle}
          </StackRow>
        </div>
      </div>
    </section>
  )
}
