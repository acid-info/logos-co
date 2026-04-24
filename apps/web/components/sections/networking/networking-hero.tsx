import { getTranslations } from 'next-intl/server'

import { LogosMark } from '@repo/ui'
import { Button, ButtonArrowIcon } from '@/components/ui'

import { ROUTES } from '@/constants/routes'
import { Link } from '@/i18n/navigation'

export default async function NetworkingHero() {
  const t = await getTranslations('pages.networking.hero')

  return (
    <section className="bg-brand-off-white">
      <div className="relative z-51 mx-auto max-w-360 px-3 pt-8">
        <Link
          href={ROUTES.technologyStack}
          className="inline-flex cursor-pointer items-center gap-1 text-brand-dark-green transition-opacity hover:opacity-70"
        >
          <span className="inline-flex size-3.75 shrink-0 rotate-180 items-center justify-center">
            <ButtonArrowIcon />
          </span>
          <span className="font-mono text-[10px] font-medium leading-[1.3] uppercase">
            {t('back')}
          </span>
        </Link>
      </div>

      <div className="mx-auto max-w-360 px-3 pt-10 pb-10">
        {/* Desktop: title left, body right, Logos app button below body */}
        <div className="relative hidden md:block md:h-29.75">
          <div className="absolute top-0 left-0 flex items-center gap-3">
            <LogosMark size={26} className="shrink-0 text-brand-dark-green" />
            <span className="text-h3-serif leading-none text-brand-dark-green">
              Networking Stack
            </span>
          </div>

          <p className="text-mono-s absolute top-0 left-178.5 w-85.5 text-black">
            {t('body')}
          </p>

          <div className="absolute top-19.5 left-178.5">
            <Button href={ROUTES.buildersHub} variant="secondary">
              {t('logosApp')}
            </Button>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-15.5 md:hidden">
          <div className="flex items-center gap-3">
            <LogosMark size={22} className="shrink-0 text-brand-dark-green" />
            <span className="text-h3-serif leading-none text-brand-dark-green">
              Networking Stack
            </span>
          </div>

          <div className="flex flex-col gap-10">
            <p className="text-mono-s text-black">{t('body')}</p>

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
