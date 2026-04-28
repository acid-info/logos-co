import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { LogosMark } from '@repo/ui'

export default async function AboutSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.about' })

  return (
    <section
      id="about"
      className="py-20 overflow-hidden border-[12px] border-brand-off-white bg-brand-off-white"
    >
      <div className="mx-auto grid max-w-[1416px] grid-cols-1 gap-10 py-16 md:h-[776px] md:grid-cols-[minmax(0,1fr)_minmax(320px,583px)] md:gap-6 md:py-0">
        <div className="flex items-center px-3 md:px-0">
          <blockquote className="text-h2 max-w-[528px] bg-[linear-gradient(90deg,#5f8fbd_0%,#385a78_58%,rgba(21,37,33,0.28)_100%)] bg-clip-text text-transparent md:ml-[30px]">
            {t('quote')}
          </blockquote>
        </div>

        <div className="relative mx-3 aspect-583/695 w-auto overflow-hidden rounded-[50px] bg-brand-dark-green md:mx-0 md:mt-7 md:w-full md:max-w-[583px] md:justify-self-end">
          <Image
            src="/images/home/about-mountain.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/70" />

          <div className="absolute right-[8.6%] bottom-[14.8%] left-[8.6%] flex flex-col gap-[30px] text-brand-off-white">
            <LogosMark size={16} className="shrink-0" />
            <div className="flex flex-col gap-5">
              <p className="text-h4-serif">{t('headline')}</p>
              <p className="text-[14px] leading-[1.2] font-medium">
                {t('body')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
