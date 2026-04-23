import type { ReactNode } from 'react'

import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'

const MOUNTAIN_ASPECT_RATIO = '1416 / 2283'
const MOUNTAIN_IMAGE_WIDTH_RATIO = '130.65%'

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      className="size-[15px] shrink-0"
      fill="none"
    >
      <path
        d="M10 5L5 10L4.08262 9.08262L7.51647 5.64876H0V4.35124H7.51647L4.08262 0.917385L5 0L10 5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LightPillLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 rounded-[12px] bg-brand-off-white px-3 py-2 font-mono text-[10px] font-semibold leading-[1.35] uppercase text-brand-dark-green transition-opacity hover:opacity-80"
    >
      {children}
      <ArrowRight />
    </a>
  )
}

export default async function MountainSection() {
  const t = await getTranslations('home.mountain')

  return (
    <section className="bg-brand-off-white px-3">
      <div className="mx-auto max-w-354">
        <div className="relative">
          <div
            className="relative z-10 overflow-hidden rounded-[900px] bg-brand-off-white"
            style={{ aspectRatio: MOUNTAIN_ASPECT_RATIO }}
          >
            <div className="absolute inset-x-0 top-px bottom-0 overflow-hidden rounded-[900px]">
              <Image
                src="/images/home/mountain-landscape.jpg"
                alt=""
                width={1850}
                height={2313}
                sizes="(min-width: 1440px) 1850px, 131vw"
                className="absolute top-0 left-1/2 h-auto max-w-none -translate-x-1/2"
                style={{ width: MOUNTAIN_IMAGE_WIDTH_RATIO }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 [clip-path:inset(0_round_900px)]">
            <div className="absolute inset-x-0 bottom-[-100svh] top-[-100svh]">
              <div className="sticky top-0 h-[100svh]">
                <div className="flex h-full flex-col items-center justify-center gap-10 px-4 text-center md:gap-[60px] md:px-0">
                  <h2 className="text-h1 w-full max-w-[22rem] text-brand-off-white md:max-w-full">
                    <span className="text-accent-light-blue">
                      {t('highlightedWord')}
                    </span>
                    <span>{` ${t('rest')}`}</span>
                  </h2>

                  <div className="pointer-events-auto">
                    <LightPillLink href={ROUTES.press}>
                      {t('cta')}
                    </LightPillLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
