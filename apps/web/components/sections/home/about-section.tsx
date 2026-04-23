import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { LogosMark } from '@repo/ui'

export default async function AboutSection() {
  const t = await getTranslations('home.about')

  return (
    <section id="about" className="bg-brand-off-white">
      <div className="mx-auto grid max-w-354 grid-cols-1 gap-8 px-3 py-20 md:grid-cols-2 md:gap-12 md:py-28">
        {/* Left — large quote */}
        <div className="flex items-center">
          <blockquote className="text-h2 text-brand-dark-green/60 italic">
            {t('quote')}
          </blockquote>
        </div>

        {/* Right — image card with gradient + text overlay */}
        <div className="relative aspect-583/695 overflow-hidden rounded-3xl bg-brand-dark-green">
          <Image
            src="/images/home/about-mountain.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/70" />

          <div className="absolute inset-x-6 bottom-6 flex gap-4">
            <LogosMark
              size={18}
              className="mt-1 shrink-0 text-brand-off-white"
            />
            <div className="flex flex-col gap-3">
              <p className="text-card-title-serif text-brand-off-white">
                {t('headline')}
              </p>
              <p className="text-caption-sans font-medium text-brand-off-white/80">
                {t('body')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
