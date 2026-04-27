import { getTranslations } from 'next-intl/server'

import { LogosMark } from '@repo/ui'
import { Button, ButtonArrowIcon } from '@/components/ui'

import { ROUTES } from '@/constants/routes'
import { Link } from '@/i18n/navigation'

export default async function StorageHero() {
  const t = await getTranslations('pages.storage.hero')

  return (
    <section className="relative h-[337px] bg-brand-off-white md:h-[356px]">
      <div className="relative mx-auto h-full max-w-360 px-3">
        <Link
          href={ROUTES.technologyStack}
          className="absolute top-[60px] left-3 inline-flex cursor-pointer items-center gap-1 text-brand-dark-green transition-opacity hover:opacity-70"
        >
          <span className="inline-flex size-3.75 shrink-0 rotate-180 items-center justify-center">
            <ButtonArrowIcon />
          </span>
          <span className="font-mono text-[10px] font-medium leading-[1.3] uppercase">
            {t('back')}
          </span>
        </Link>

        <div className="absolute top-[120px] left-3 flex items-center gap-3">
          <LogosMark
            size={22}
            className="shrink-0 text-brand-dark-green md:h-6.5 md:w-5"
          />
          <h1 className="text-h3-serif leading-none text-brand-dark-green">
            {t('title')}
          </h1>
        </div>

        <div className="absolute top-[182px] right-3 left-3 flex flex-col gap-10 md:top-[120px] md:left-181.5 md:w-85.5">
          <p className="text-mono-s text-brand-dark-green">{t('body')}</p>
          <div className="flex items-baseline gap-3">
            <Button href={ROUTES.buildersHub} variant="secondary">
              {t('logosApp')}
            </Button>
            <Button href="#" variant="tertiary">
              {t('docs')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
