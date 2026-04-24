import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui'

export default async function NetworkingIntro() {
  const t = await getTranslations('pages.networking.intro')

  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3">
        {/* Desktop: three columns, absolute positioning to match Figma */}
        <div className="relative hidden md:block md:h-39.5">
          <div className="text-h4-sans absolute top-[39px] left-0 text-brand-dark-green">
            <p className="whitespace-nowrap">{t('titleLine1')}</p>
            <p className="whitespace-nowrap">{t('titleLine2')}</p>
          </div>

          <p className="text-mono-s absolute top-[39px] left-178.5 w-86.25 text-brand-dark-green">
            {t('body')}
          </p>

          <div className="absolute top-[39px] left-297.5">
            <Button
              href="#"
              variant="tertiary"
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              {t('cta')}
            </Button>
          </div>
        </div>

        {/* Mobile: vertical stack — title→body gap 12, body→cta gap 24 */}
        <div className="flex flex-col gap-6 pt-10 pb-10 md:hidden">
          <div className="flex flex-col gap-3">
            <div className="text-h4-sans text-brand-dark-green">
              <p className="whitespace-nowrap">{t('titleLine1')}</p>
              <p className="whitespace-nowrap">{t('titleLine2')}</p>
            </div>
            <p className="text-mono-s text-brand-dark-green">{t('body')}</p>
          </div>
          <Button
            href="#"
            variant="tertiary"
            className="w-fit cursor-pointer transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}
