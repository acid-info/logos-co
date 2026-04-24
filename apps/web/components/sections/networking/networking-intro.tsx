import { getTranslations } from 'next-intl/server'

import { Button, ButtonArrowIcon } from '@repo/ui'

export default async function NetworkingIntro() {
  const t = await getTranslations('pages.networking.intro')

  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white">
      <div className="mx-auto max-w-354 px-3">
        {/* Desktop: three columns, absolute positioning to match Figma */}
        <div className="relative hidden md:block md:h-[158px]">
          <p className="text-h4-sans absolute top-[39px] left-0 w-[193px] text-brand-dark-green">
            {t('title')}
          </p>

          <p className="text-mono-s absolute top-[39px] left-[714px] w-[345px] text-brand-dark-green">
            {t('body')}
          </p>

          <div className="absolute top-[39px] left-[1190px]">
            <Button
              href="#"
              variant="link"
              icon={<ButtonArrowIcon />}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              {t('cta')}
            </Button>
          </div>
        </div>

        {/* Mobile: vertical stack — title→body gap 12, body→cta gap 24 */}
        <div className="flex flex-col gap-6 pt-10 pb-10 md:hidden">
          <div className="flex flex-col gap-3">
            <p className="text-h4-sans w-[193px] text-brand-dark-green">
              {t('title')}
            </p>
            <p className="text-mono-s text-brand-dark-green">{t('body')}</p>
          </div>
          <Button
            href="#"
            variant="link"
            icon={<ButtonArrowIcon />}
            className="w-fit cursor-pointer transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}
