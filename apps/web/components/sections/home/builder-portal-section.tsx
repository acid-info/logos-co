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

export default async function BuilderPortalSection() {
  const t = await getTranslations('home.builderPortal')

  const features = [
    { number: '01', text: t('feature1') },
    { number: '02', text: t('feature2') },
    { number: '03', text: t('feature3') },
  ]

  const examples = [
    { title: t('example1Title'), desc: t('example1Desc') },
    { title: t('example2Title'), desc: t('example2Desc') },
    { title: t('example3Title'), desc: t('example3Desc') },
    { title: t('example4Title'), desc: t('example4Desc') },
  ]

  return (
    <section id="builder-portal" className="bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: text content */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-brand-dark-green text-[56px] leading-none tracking-[-1.68px]">
              {t('title')}
            </h2>

            <div className="space-y-5">
              {features.map((f) => (
                <p key={f.number} className="text-mono-s text-brand-dark-green/70">
                  <span className="text-mono-s font-semibold text-brand-dark-green mr-8">{f.number}</span>
                  {f.text}
                </p>
              ))}
            </div>

            <div className="mt-2">
              {examples.map((ex) => (
                <div
                  key={ex.title}
                  className="border-brand-dark-green/10 flex gap-3 border-b py-2.5 md:gap-8"
                >
                  <span className="text-mono-s font-semibold text-brand-dark-green w-1/2 shrink-0">
                    {ex.title}
                  </span>
                  <span className="text-mono-s text-brand-dark-green/60">{ex.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <PrimaryBtn href={ROUTES.buildersHub}>{t('cta')}</PrimaryBtn>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="aspect-702/626 relative">
              <Image
                src="/images/home/builder-portal.jpg"
                alt={t('title')}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 flex max-w-100 items-start gap-6 rounded-xl bg-brand-dark-green/80 p-3 backdrop-blur-sm">
              <p className="text-mono-s font-semibold text-brand-off-white shrink-0">{t('buildLabel')}</p>
              <p className="text-mono-s text-brand-off-white/80">{t('buildDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
