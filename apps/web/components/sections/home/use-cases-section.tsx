'use client'

import { useRef } from 'react'
import Image from 'next/image'

import { IconButton } from '@repo/ui'
import type { CardGridSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'

function ScrollButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <IconButton
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      variant="outline"
      size="sm"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {direction === 'left' ? (
          <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" />
        ) : (
          <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" />
        )}
      </svg>
    </IconButton>
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
    <div className="border-brand-dark-green/10 flex h-79.25 w-71.25 shrink-0 flex-col rounded-2xl border p-4 transition-shadow hover:shadow-lg md:w-auto">
      <h4 className="text-h4-serif text-brand-dark-green">{title}</h4>
      <div className="mt-3">
        <Button
          href={href}
          variant="link"
          icon={<ButtonArrowIcon />}
          className="transition-opacity hover:opacity-70"
        >
          {ctaLabel}
        </Button>
      </div>
      <div className="mt-auto flex items-end justify-between gap-4">
        <p className="text-mono-s text-brand-dark-green/70 max-w-46.5">
          {description}
        </p>
        <div className="bg-brand-dark-green/5 relative h-30 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>
    </div>
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
          ) : null,
        )}
      </div>
    </section>
  )
}
