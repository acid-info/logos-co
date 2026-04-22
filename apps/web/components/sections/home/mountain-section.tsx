import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      className="size-2.5 shrink-0"
      fill="none"
    >
      <path
        d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function LightPillLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-brand-off-white px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green transition-opacity hover:opacity-80"
    >
      {children}
      <ArrowRight />
    </a>
  )
}

export default async function MountainSection() {
  const t = await getTranslations('home.mountain')

  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-354 px-3">
        <div className="relative">
          <div className="pointer-events-none sticky top-25 z-20 -mb-[calc(100vh-100px)] h-[calc(100vh-100px)] overflow-hidden">
            <div className="flex h-full flex-col items-center px-5 pt-6 text-center md:px-0">
              <h2 className="font-display max-w-88 text-[2.75rem] leading-[0.98] tracking-[-0.04em] text-brand-off-white md:max-w-[1416px] md:text-[6rem]">
                <span className="text-accent-light-blue">
                  {t('highlightedWord')}
                </span>{' '}
                <span>{t('rest')}</span>
              </h2>

              <div className="pointer-events-auto mt-8 md:mt-15">
                <LightPillLink href={ROUTES.press}>{t('cta')}</LightPillLink>
              </div>
            </div>
          </div>

          <div
            className="relative z-10 overflow-hidden rounded-[900px]"
            style={{ aspectRatio: '1416 / 2283' }}
          >
            <Image
              src="/images/home/mountain-landscape.jpg"
              alt=""
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
          </div>
        </div>
      </div>
    </section>
  )
}
