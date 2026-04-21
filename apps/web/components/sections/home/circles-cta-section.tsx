import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'

function PrimaryBtn({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-brand-dark-green px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-off-white transition-opacity hover:opacity-70"
    >
      {children}
      <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
        <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  )
}

function TextLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green transition-opacity hover:opacity-70"
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
        <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  )
}

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
            <PrimaryBtn href={ROUTES.circles}>{t('findCta')}</PrimaryBtn>
            <TextLink href={ROUTES.circles}>{t('startCta')}</TextLink>
          </div>
        </div>

        {/* World map */}
        <div className="mt-14 aspect-1416/710 overflow-hidden rounded-2xl bg-brand-dark-green/10">
          <div className="relative h-full w-full">
            <Image src="/images/home/world-map-img.jpg" alt="World map showing Logos Circles locations" fill className="object-cover opacity-80" />
            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                aria-label="Zoom out"
                className="flex size-16 cursor-pointer items-center justify-center rounded-full bg-brand-dark-green font-display text-lg text-brand-off-white transition-opacity hover:opacity-80"
              >
                &minus;
              </button>
              <button
                aria-label="Zoom in"
                className="flex size-16 cursor-pointer items-center justify-center rounded-full bg-brand-dark-green font-display text-lg text-brand-off-white transition-opacity hover:opacity-80"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
