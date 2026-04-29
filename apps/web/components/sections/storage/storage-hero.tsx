import { LogosMark } from '@repo/ui'
import type { HeroSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'
import { Link } from '@/i18n/navigation'

type Props = {
  data: HeroSection
  backHref: string
}

export default function StorageHero({ data, backHref }: Props) {
  const [primaryCta, secondaryCta] = data.ctas ?? []

  return (
    <section className="relative h-[337px] bg-brand-off-white md:h-[356px]">
      <div className="relative mx-auto h-full max-w-360 px-3">
        <Link
          href={backHref}
          className="absolute top-[60px] left-3 inline-flex cursor-pointer items-center gap-1 text-brand-dark-green transition-opacity hover:opacity-70"
        >
          <span className="inline-flex size-3.75 shrink-0 rotate-180 items-center justify-center">
            <ButtonArrowIcon />
          </span>
          <span className="font-mono text-[10px] font-medium leading-[1.3] uppercase">
            {data.eyebrow}
          </span>
        </Link>

        <div className="absolute top-[120px] left-3 flex items-center gap-3">
          <LogosMark size={26} className="shrink-0 text-gray-03" />
          <h1 className="text-h3-serif leading-none text-brand-dark-green">
            {data.headline}
          </h1>
        </div>

        <div className="absolute top-[182px] right-3 left-3 flex flex-col gap-10 md:top-[120px] md:left-181.5 md:w-85.5">
          {data.body ? (
            <p className="text-mono-s text-brand-dark-green">{data.body}</p>
          ) : null}
          <div className="flex items-baseline gap-3">
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
      </div>
    </section>
  )
}
