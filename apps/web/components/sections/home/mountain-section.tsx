'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

export default function MountainSection() {
  const t = useTranslations('home.mountain')

  return (
    <section className="bg-brand-off-white relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        <div className="relative overflow-hidden rounded-[900px]" style={{ height: '70vh', minHeight: '480px' }}>
          <Image
            src="/images/home/mountain-landscape.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 text-center">
            <h2 className="font-display text-[56px] leading-[0.98] tracking-[-1.68px] text-brand-off-white md:text-[80px] md:tracking-[-2.4px]">
              <span className="text-[#c6ebf7]">{t('highlightedWord')} </span>
              <span className="text-brand-off-white">{t('rest')}</span>
            </h2>
            <a
              href={ROUTES.circles}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-brand-off-white px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green transition-opacity hover:opacity-70"
            >
              {t('cta')}
              <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
                <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
