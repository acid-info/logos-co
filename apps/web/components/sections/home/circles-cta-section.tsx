import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Button, ButtonArrowIcon, IconButton } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

export default async function CirclesCtaSection() {
  const t = await getTranslations('home.circlesCta')

  return (
    <section className="bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        {/* Headline + body + CTAs */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-h1 text-brand-dark-green">
            <span className="text-brand-yellow">{t('count')}</span>{' '}
            {t('headline')}
          </h2>

          <p className="text-mono-s text-brand-dark-green/70 mt-10 max-w-114">
            {t('body')}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Button
              href={ROUTES.circles}
              className="transition-opacity hover:opacity-70"
            >
              {t('findCta')}
            </Button>
            <Button
              href={ROUTES.circles}
              variant="link"
              icon={<ButtonArrowIcon />}
              className="transition-opacity hover:opacity-70"
            >
              {t('startCta')}
            </Button>
          </div>
        </div>

        {/* World map */}
        <div className="mt-14 aspect-1416/710 overflow-hidden rounded-2xl bg-brand-dark-green/10">
          <div className="relative h-full w-full">
            <Image
              src="/images/home/world-map-img.jpg"
              alt="World map showing Logos Circles locations"
              fill
              className="object-cover opacity-80"
            />
            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <IconButton
                aria-label="Zoom out"
                className="font-display text-lg"
              >
                &minus;
              </IconButton>
              <IconButton aria-label="Zoom in" className="font-display text-lg">
                +
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
