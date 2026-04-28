import type { Rfp } from '@repo/content/loaders'

import { Button } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

type Props = {
  index: number
  rfp: Rfp
}

const formatReward = (reward: Rfp['reward']): string => {
  if (!reward) return ''
  return reward.xp
    ? `${reward.amount} ${reward.currency} + ${reward.xp} XP`
    : `${reward.amount} ${reward.currency}`
}

/**
 * Compact row variant used by the RFPs listing in `list` view mode. Mirrors
 * the home Ideas table row pattern: index + title left, tagline middle,
 * reward + CTA right. Same alternating row backgrounds.
 */
export function RfpListRow({ index, rfp }: Props) {
  const indexLabel = index.toString().padStart(2, '0')
  const isOdd = index % 2 === 1
  const bg = isOdd ? 'bg-gray-01' : 'bg-brand-dark-green/5'
  const detailHref = `${ROUTES.rfps}/${rfp.slug}`
  const blurb = rfp.tagline ?? rfp.summary

  return (
    <li className={`${bg} relative w-full`}>
      {/* Mobile */}
      <div className="relative h-[116px] md:hidden">
        <p className="absolute top-3 left-3 w-[179px] font-sans text-[14px] leading-[1.2] text-brand-dark-green">
          <span className="font-medium">{indexLabel}</span>
          <span className="ml-3 font-display">{rfp.title}</span>
        </p>
        <p className="absolute top-[75px] left-3 w-[260px] font-mono text-[10px] leading-[1.3] text-brand-dark-green truncate">
          {blurb}
        </p>
        <div className="absolute top-3 right-3">
          <Button href={detailHref} variant="secondary">
            {rfp.ctaLabel ?? 'Apply'}
          </Button>
        </div>
        {rfp.reward ? (
          <p className="absolute top-[75px] right-3 w-[107px] font-mono text-[10px] leading-[1.3] text-brand-dark-green text-right">
            {formatReward(rfp.reward)}
          </p>
        ) : null}
      </div>

      {/* Desktop */}
      <div className="relative hidden h-[50px] md:block">
        <div className="absolute top-3 left-3 flex items-baseline gap-3">
          <span className="font-sans text-[14px] font-medium leading-[1.2] text-brand-dark-green w-[18px]">
            {indexLabel}
          </span>
          <span className="font-display text-[14px] leading-[1.2] text-brand-dark-green whitespace-nowrap">
            {rfp.title}
          </span>
        </div>
        <p className="absolute top-3 left-[50%] translate-x-[6px] w-[464px] font-mono text-[10px] leading-[1.3] text-brand-dark-green truncate">
          {blurb}
        </p>
        <div className="absolute top-3 left-[83.33%] translate-x-[2px] flex items-center gap-3">
          {rfp.reward ? (
            <span className="w-[107px] font-mono text-[10px] leading-[1.3] text-brand-dark-green">
              {formatReward(rfp.reward)}
            </span>
          ) : (
            <span className="w-[107px]" />
          )}
          <Button href={detailHref} variant="link">
            {rfp.ctaLabel ?? 'Apply'}
          </Button>
        </div>
      </div>
    </li>
  )
}
