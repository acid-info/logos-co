import type { Idea } from '@repo/content/loaders'

import { Button } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

type Props = {
  index: number
  idea: Idea
}

const formatReward = (reward: Idea['reward']): string | null => {
  if (!reward) return null
  const amount = `${reward.amount} ${reward.currency}`
  return reward.xp ? `${amount} + ${reward.xp} XP` : amount
}

/**
 * Single Ideas-table row on the Builders Hub home (Figma desktop 40009046:24082,
 * mobile 40009046:23857).
 *
 * Desktop: 50 px row, 3 columns (index+title 714 / submitter 464 / reward+CTA 149).
 * Mobile:  116 px row, mixed: title row 1, submitter row 2, reward + CTA stacked
 *          on the right edge.
 */
export function IdeaRow({ index, idea }: Props) {
  const indexLabel = index.toString().padStart(2, '0')
  const isOdd = index % 2 === 1
  const bg = isOdd ? 'bg-gray-01' : 'bg-brand-dark-green/5'
  const submitter = `${idea.tagline ?? idea.summary} / Idea by @${idea.submitter.handle}`
  const detailHref = `${ROUTES.ideas}/${idea.slug}`
  const reward = formatReward(idea.reward)
  const ctaHref = idea.discussionUrl ?? detailHref
  const ctaExternal = Boolean(idea.discussionUrl)
  const ctaLabel = idea.ctaLabel ?? 'Apply'

  return (
    <li className={`${bg} relative w-full`}>
      {/* Mobile: 116 px stacked layout */}
      <div className="relative h-[116px] md:hidden">
        <p className="absolute top-3 left-3 w-[179px] font-sans text-[14px] leading-[1.2] text-brand-dark-green">
          <span className="font-medium">{indexLabel}</span>
          <span className="ml-3 font-display">{idea.title}</span>
        </p>
        <p className="absolute top-[75px] left-3 w-[260px] font-mono text-[10px] leading-[1.3] text-brand-dark-green truncate">
          {submitter}
        </p>
        <div className="absolute top-3 right-3">
          <Button
            href={ctaHref}
            variant="secondary"
            {...(ctaExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {ctaLabel}
          </Button>
        </div>
        {reward ? (
          <p className="absolute top-[75px] right-3 w-[83px] font-mono text-[10px] leading-[1.3] text-brand-dark-green text-right">
            {reward}
          </p>
        ) : null}
      </div>

      {/* Desktop: 50 px, 3 columns */}
      <div className="relative hidden h-[50px] md:block">
        {/* Index + Title */}
        <div className="absolute top-3 left-3 flex items-baseline gap-3">
          <span className="font-sans text-[14px] font-medium leading-[1.2] text-brand-dark-green w-[18px]">
            {indexLabel}
          </span>
          <span className="font-display text-[14px] leading-[1.2] text-brand-dark-green whitespace-nowrap">
            {idea.title}
          </span>
        </div>
        {/* Submitter line */}
        <p className="absolute top-3 left-[50%] translate-x-[6px] w-[464px] font-mono text-[10px] leading-[1.3] text-brand-dark-green truncate">
          {submitter}
        </p>
        {/* Reward + CTA */}
        <div className="absolute top-3 left-[83.33%] translate-x-[2px] flex items-center gap-3">
          {reward ? (
            <span className="w-[107px] font-mono text-[10px] leading-[1.3] text-brand-dark-green">
              {reward}
            </span>
          ) : (
            <span className="w-[107px]" />
          )}
          <Button
            href={ctaHref}
            variant="link"
            {...(ctaExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </li>
  )
}
