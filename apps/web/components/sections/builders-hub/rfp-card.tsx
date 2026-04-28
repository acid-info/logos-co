import Image from 'next/image'

import type { Rfp } from '@repo/content/loaders'

import { Button } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import { ROUTES } from '@/constants/routes'

type Props = {
  rfp: Rfp
}

/**
 * Single RFP card on the Builders Hub home grid (Figma 40009046:24016 et al).
 *
 * Geometry: 345 × 317, rounded-12, 1 px dark-green/50 border. Title top-left,
 * CTA below, image bottom-right, description bottom-left. Body copy comes
 * from `tagline` (with `summary` as fallback).
 */
export function RfpCard({ rfp }: Props) {
  const detailHref = `${ROUTES.rfps}/${rfp.slug}`
  const blurb = rfp.tagline ?? rfp.summary

  return (
    <article className="relative w-[345px] h-[317px] rounded-[12px] border border-brand-dark-green/50 overflow-hidden bg-brand-off-white shrink-0">
      {/* Title */}
      <Link
        href={detailHref}
        className="absolute left-4 top-4 w-[249px] cursor-pointer"
      >
        <h3 className="font-sans text-[24px] font-normal leading-[1.1] tracking-tight text-brand-dark-green">
          {rfp.title}
        </h3>
      </Link>

      {/* CTA */}
      <div className="absolute left-4 top-[83px]">
        <Button href={detailHref} variant="link">
          {rfp.ctaLabel ?? 'Learn more'}
        </Button>
      </div>

      {/* Image */}
      {rfp.image ? (
        <div className="absolute right-2.5 bottom-3 w-[96px]">
          <Image
            src={rfp.image.src}
            alt={rfp.image.alt}
            width={rfp.image.width}
            height={rfp.image.height}
            className="size-full object-contain"
          />
        </div>
      ) : null}

      {/* Description */}
      <p className="absolute left-4 bottom-4 w-[186px] font-mono text-[10px] leading-[1.3] text-brand-dark-green">
        {blurb}
      </p>
    </article>
  )
}
