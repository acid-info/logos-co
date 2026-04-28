import { LogosMark } from '@repo/ui'
import type { HeroSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'
import { Link } from '@/i18n/navigation'

type Props = {
  data: HeroSection
  backHref: string
}

export default function MessagingHero({ data, backHref }: Props) {
  const [primaryCta, secondaryCta] = data.ctas ?? []

  return (
    <section className="relative h-[337px] bg-brand-off-white md:h-[270px]">
      <div className="relative mx-auto h-full max-w-360 px-3">
        <Link
          href={backHref}
          className="absolute top-[60px] left-3 inline-flex cursor-pointer items-center gap-1 text-brand-dark-green transition-opacity hover:opacity-70"
        >
          <span className="inline-flex size-3.75 shrink-0 rotate-180 items-center justify-center">
            <ButtonArrowIcon />
          </span>
          <span className="font-mono text-[10px] leading-[1.3] font-semibold uppercase">
            {data.eyebrow}
          </span>
        </Link>

        <div className="absolute top-30 left-3 flex items-center gap-3 md:gap-3">
          <LogosMark
            size={26}
            className="hidden shrink-0 text-brand-dark-green md:block"
          />
          <LogosMark
            size={22}
            className="shrink-0 text-brand-dark-green md:hidden"
          />
          <h1 className="text-h3-serif leading-none text-brand-dark-green">
            {data.headline}
          </h1>
        </div>

        {data.body ? (
          <p className="text-mono-s absolute top-[182px] right-3 left-3 text-black md:top-30 md:left-181.5 md:w-85.5">
            {data.body}
          </p>
        ) : null}

        <div className="absolute top-[248px] left-3 flex items-baseline gap-3 md:top-[199px] md:left-181.5">
          {primaryCta ? (
            <Button href={primaryCta.href} variant="secondary">
              {primaryCta.label}
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button href={secondaryCta.href} variant="tertiary">
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
