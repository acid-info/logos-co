import { getTranslations } from 'next-intl/server'

import { Button, ButtonArrowIcon, LogosMark } from '@repo/ui'

import { ROUTES } from '@/constants/routes'

export default async function NetworkingHero() {
  const t = await getTranslations('pages.networking.hero')

  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-354 px-3 pt-5">
        <a
          href={ROUTES.technologyStack}
          className="inline-flex cursor-pointer items-center gap-1 text-brand-dark-green transition-opacity hover:opacity-70"
        >
          <span className="inline-flex size-[15px] shrink-0 rotate-180 items-center justify-center">
            <ButtonArrowIcon />
          </span>
          <span className="border-b border-brand-dark-green/50 pb-[2px] font-mono text-[10px] font-semibold leading-[1.35] uppercase">
            {t('back')}
          </span>
        </a>
      </div>

      <div className="mx-auto max-w-354 px-3 pt-10 pb-10">
        {/* Desktop: title left, body right, Logos app button below body */}
        <div className="relative hidden md:block md:h-[119px]">
          <div className="absolute top-0 left-0 flex items-center gap-3">
            <LogosMark size={26} className="shrink-0 text-brand-dark-green" />
            <span className="text-h3-serif leading-none text-brand-dark-green">
              Networking Stack
            </span>
          </div>

          <p className="text-mono-s absolute top-0 left-[714px] w-[342px] text-brand-dark-green">
            {t('body')}
          </p>

          <div className="absolute top-[78px] left-[714px]">
            <Button href={ROUTES.buildersHub} variant="secondary">
              {t('logosApp')}
            </Button>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-[62px] md:hidden">
          <div className="flex items-center gap-3">
            <LogosMark size={22} className="shrink-0 text-brand-dark-green" />
            <span className="text-h3-serif leading-none text-brand-dark-green">
              Networking Stack
            </span>
          </div>

          <div className="flex flex-col gap-10">
            <p className="text-mono-s text-brand-dark-green">{t('body')}</p>

            <div className="flex items-center gap-3">
              <Button href={ROUTES.buildersHub} variant="secondary">
                {t('logosApp')}
              </Button>
              <Button href="#" variant="tertiary">
                Docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
