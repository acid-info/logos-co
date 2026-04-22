import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

export default async function BuilderPortalSection() {
  const t = await getTranslations('home.builderPortal')

  const examples = [
    { title: t('example1Title'), desc: t('example1Desc') },
    { title: t('example2Title'), desc: t('example2Desc') },
    { title: t('example3Title'), desc: t('example3Desc') },
    { title: t('example4Title'), desc: t('example4Desc') },
  ]

  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white pt-10 pb-25">
      <div className="mx-auto max-w-354 px-3">
        <div className="flex gap-3 pt-3">

          {/* Left column — 702px fixed, absolutely positioned internals */}
          <div className="relative h-174 w-175.5 shrink-0 text-brand-dark-green">

            {/* H2 title */}
            <h2 className="absolute top-1.25 w-145.5 font-display text-[56px] leading-none tracking-[-1.68px]">
              {t('title')}
            </h2>

            {/* Feature 01 — bottom edge at 213px */}
            <div className="absolute top-53.25 -translate-y-full w-86.25 flex flex-col justify-end">
              <p className="text-mono-s">
                <span className="inline-block w-30">01</span>
                {t('feature1')}
              </p>
            </div>

            {/* Feature 02 — bottom edge at 305px */}
            <div className="absolute top-76.25 -translate-y-full w-86.25 flex flex-col justify-end">
              <p className="text-mono-s">
                <span className="inline-block w-30">02</span>
                {t('feature2')}
              </p>
            </div>

            {/* Feature 03 — bottom edge at 397px */}
            <div className="absolute top-99.25 -translate-y-full w-86.25 flex flex-col justify-end">
              <p className="text-mono-s">
                <span className="inline-block w-30">03</span>
                {t('feature3')}
              </p>
            </div>

            {/* Example table — starts at 474px */}
            <div className="absolute top-118.5 w-full flex flex-col gap-3">
              {examples.map((ex) => (
                <div
                  key={ex.title}
                  className="flex gap-3 items-start border-t border-brand-dark-green/50 pt-1.5"
                >
                  <span className="font-mono text-[10px] leading-[1.3] font-medium uppercase text-brand-dark-green w-86.25 shrink-0">
                    {ex.title}
                  </span>
                  <span className="text-mono-s text-brand-dark-green flex-1">
                    {ex.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — flex-1 */}
          <div className="flex flex-1 flex-col gap-7.5 items-start min-w-0">

            {/* Image */}
            <div className="relative h-156.5 w-full overflow-hidden rounded-xl">
              <Image
                src="/images/home/builder-portal.jpg"
                alt={t('title')}
                fill
                className="object-cover"
              />
              {/* Top-to-middle dark gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 25.835%, rgba(0,0,0,0) 50%)' }}
              />
              {/* Overlay: lambda+BUILD left, description right */}
              <div className="absolute left-3 top-3 right-3 flex items-start justify-between">
                <div className="flex w-35.5 items-center justify-between">
                  <LogosMark size={9} className="shrink-0 text-brand-off-white" />
                  <span className="font-mono text-[10px] leading-[1.3] font-medium uppercase text-brand-off-white">
                    {t('buildLabel')}
                  </span>
                </div>
                <p className="text-mono-s text-brand-off-white w-83.25">
                  {t('buildDesc')}
                </p>
              </div>
            </div>

            {/* CTA button */}
            <a
              href={ROUTES.buildersHub}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-brand-dark-green px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-off-white transition-opacity hover:opacity-70"
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
