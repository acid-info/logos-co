import Image from 'next/image'

import type { CardGridSection } from '@repo/content/schemas'

import { Button } from '@/components/ui'

import { SectionMarker } from './messaging-shared'

/**
 * Per-card image className is positional — Figma's two case study cards
 * crop their illustrations at different aspect ratios. Editors managing
 * this section keep the slot order stable; reordering would mismatch each
 * title with its illustration crop.
 */
const CARD_IMAGE_CLASSNAMES = [
  'absolute top-3 right-3 h-[66px] w-[53px] md:top-auto md:right-3 md:bottom-3 md:h-[120px] md:w-24',
  'absolute top-3 right-3 h-[52px] w-[66px] md:top-auto md:right-3 md:bottom-3 md:h-[77px] md:w-24',
]

type CaseStudyCardProps = {
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  imageClassName: string
  ctaLabel?: string
  ctaHref?: string
}

function CaseStudyCard({
  title,
  body,
  imageSrc,
  imageAlt,
  imageClassName,
  ctaLabel,
  ctaHref,
}: CaseStudyCardProps) {
  return (
    <article className="relative h-[299px] overflow-hidden rounded-xl border border-brand-dark-green/50 md:h-[406px] md:flex-1">
      <div className="absolute top-3 left-3 flex h-[263px] w-[348px] flex-col justify-between md:h-[380px] md:w-[453px]">
        <SectionMarker label="Case Study" className="scale-[0.98] origin-left" />

        <div className="flex flex-col gap-6 text-brand-dark-green md:gap-6">
          <h3 className="text-subhead-sans w-[195px] md:w-57">{title}</h3>
          <p className="text-mono-s w-[344px] md:w-[453px]">{body}</p>
        </div>
      </div>

      {ctaLabel && ctaHref ? (
        <Button
          href={ctaHref}
          variant="primary"
          className="absolute top-3 right-3 hidden md:inline-flex"
        >
          {ctaLabel}
        </Button>
      ) : null}

      <div className={imageClassName}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
    </article>
  )
}

type Props = {
  data: CardGridSection
}

export default function MessagingCaseStudies({ data }: Props) {
  return (
    <section className="mt-15 bg-brand-off-white md:mt-10">
      <div className="mx-auto max-w-360 px-3 pt-31 md:px-0 md:pt-25">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3 md:px-3">
          {data.heading ? (
            <h2 className="text-h4-sans text-brand-dark-green">{data.heading}</h2>
          ) : null}
          {data.subheading ? (
            <p className="text-mono-s text-brand-dark-green md:w-83.5">
              {data.subheading}
            </p>
          ) : null}
        </div>

        <div className="mt-15 flex flex-col gap-3 md:mt-10 md:flex-row md:px-3">
          {data.cards.map((card, index) =>
            card.image ? (
              <CaseStudyCard
                key={card.title}
                title={card.title}
                body={card.description ?? ''}
                imageSrc={card.image.src}
                imageAlt={card.image.alt}
                imageClassName={
                  CARD_IMAGE_CLASSNAMES[index] ?? CARD_IMAGE_CLASSNAMES[0]
                }
                ctaLabel={card.cta?.label}
                ctaHref={card.cta?.href}
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  )
}
