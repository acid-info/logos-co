import { LogosMark } from '@repo/ui'
import type { BuilderHubSettings } from '@repo/content/schemas'

import { Button } from '@/components/ui'

type Props = {
  hero: BuilderHubSettings['hero']
}

/**
 * Builders Hub hero — λ logomark top-left, eyebrow + optional top-right CTA at
 * top, large two-line title centered (desktop) / left-aligned (mobile).
 *
 * Figma desktop node 40009046:23949 — frame 1440 × 727; mobile 40009046:23765
 * — frame 393 × 857.
 */
export function BuildersHubHero({ hero }: Props) {
  return (
    <div className="relative w-full pt-6 md:h-[337px]">
      {/* λ mark, top-left */}
      <div className="absolute left-3 top-6">
        <LogosMark size={75} className="text-brand-dark-green" />
      </div>

      {/* Eyebrow — desktop center / mobile right */}
      {hero.description ? (
        <p className="font-mono text-[10px] leading-[1.3] text-black absolute top-6 left-[203px] w-[178px] md:left-[50%] md:translate-x-[6px] md:w-[226px]">
          {hero.description}
        </p>
      ) : null}

      {/* Top-right CTA */}
      {hero.topRightCta ? (
        <div className="absolute top-[11px] right-3 md:left-[83.33%] md:right-auto md:translate-x-[2px]">
          <Button
            href={hero.topRightCta.href}
            variant="link"
            {...(hero.topRightCta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {hero.topRightCta.label}
          </Button>
        </div>
      ) : null}

      {/* Title — wraps "Logos / Builders Hub" into two lines, centered. */}
      <h1 className="text-h2 text-brand-dark-green leading-none tracking-tight pt-[140px] px-3 text-center md:px-0">
        {hero.title.split(' ').length > 1
          ? renderTitleLines(hero.title)
          : hero.title}
      </h1>
    </div>
  )
}

/**
 * Splits "Logos Builders Hub" → ["Logos", "Builders Hub"] so each renders on
 * its own line. Generalises: first word on line 1, the rest on line 2. Editors
 * can keep the value as one string in the fixture.
 */
function renderTitleLines(title: string) {
  const words = title.split(/\s+/)
  if (words.length < 2) return title
  const [first, ...rest] = words
  return (
    <>
      <span className="block">{first}</span>
      <span className="block">{rest.join(' ')}</span>
    </>
  )
}
