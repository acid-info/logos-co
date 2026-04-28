'use client'

import { useRef } from 'react'
import Image from 'next/image'

import type { CardGridSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'
import { Link } from '@/i18n/navigation'

function ScrollButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      className="flex size-10 cursor-pointer items-center justify-center rounded-[4px] bg-brand-off-white/10 text-brand-dark-green backdrop-blur-[5px] transition-colors hover:bg-brand-dark-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-green"
    >
      <img
        src={
          direction === 'left'
            ? '/icons/arrow-left.svg'
            : '/icons/arrow-right.svg'
        }
        alt=""
        aria-hidden="true"
        className="size-[18px]"
      />
    </button>
  )
}

interface UseCaseCardProps {
  title: string
  description: string
  href: string
  ctaLabel: string
  imageSrc: string
  imageAlt: string
}

function UseCaseCard({
  title,
  description,
  href,
  ctaLabel,
  imageSrc,
  imageAlt,
}: UseCaseCardProps) {
  return (
    <Link
      href={href}
      className="border-brand-dark-green/10 group flex h-79.25 w-71.25 shrink-0 cursor-pointer flex-col rounded-2xl border p-4 transition-colors hover:bg-gray-01 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-green md:w-auto"
    >
      <h4 className="text-h4-serif text-brand-dark-green">{title}</h4>
      <div className="mt-3">
        <span className="inline-flex items-center justify-center text-brand-dark-green">
          <span className="font-mono text-[10px] leading-[1.35] font-semibold uppercase whitespace-nowrap border-b border-brand-dark-green/50 pb-[2px]">
            {ctaLabel}
          </span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            <ButtonArrowIcon />
          </span>
        </span>
      </div>
      <div className="mt-auto flex items-end justify-between gap-4">
        <p className="text-mono-s text-brand-dark-green/70 max-w-46.5">
          {description}
        </p>
        <div className="bg-brand-dark-green/5 relative h-30 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>
    </Link>
  )
}

type Props = {
  data: CardGridSection
}

export default function UseCasesSection({ data }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -360 : 360
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  // The header image reuses the first card's image (matches existing render).
  const headerImage = data.cards[0]?.image

  return (
    <section
      id="use-cases"
      className="w-full overflow-hidden bg-brand-off-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-354 px-3">
        {/* Header row — subheading + subheadingExtra at two desktop columns */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          {data.subheading ? (
            <p className="text-mono-s text-brand-dark-green/70 max-w-56.5">
              {data.subheading}
            </p>
          ) : null}
          {data.subheadingExtra ? (
            <p className="text-mono-s text-brand-dark-green/70 max-w-56.5 md:text-right">
              {data.subheadingExtra}
            </p>
          ) : null}
        </div>

        {/* Image + title */}
        {headerImage ? (
          <div className="mb-2 flex items-start gap-3">
            <div className="relative h-20.25 w-26.75 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={headerImage.src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
        {data.heading ? (
          <h2 className="text-h1 text-brand-dark-green text-center">
            {data.heading}
          </h2>
        ) : null}

        {/* Scroll controls + CTA */}
        <div className="mt-4 mb-6 flex items-center justify-between">
          <div className="flex gap-2.5">
            <ScrollButton direction="left" onClick={() => scroll('left')} />
            <ScrollButton direction="right" onClick={() => scroll('right')} />
          </div>
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
      </div>

      {/* Cards — horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex w-full gap-3 overflow-x-auto px-3 pb-4 md:px-[calc((100%-88.5rem)/2+0.75rem)]"
        style={{ scrollbarWidth: 'none' }}
      >
        {data.cards.map((card) =>
          card.image && card.cta ? (
            <UseCaseCard
              key={card.title}
              title={card.title}
              description={card.description ?? ''}
              href={card.cta.href}
              ctaLabel={card.cta.label}
              imageSrc={card.image.src}
              imageAlt={card.image.alt || card.title}
            />
          ) : null
        )}
      </div>
    </section>
  )
}
