import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export default async function TechOverviewHero() {
  const t = await getTranslations('pages.technologyStack')

  return (
    <section className="bg-brand-off-white px-3 pt-[52px] pb-10 md:pt-[52px] md:pb-14">
      <div className="relative mx-auto max-w-354 md:h-[440px]">
        <div className="absolute left-0 top-3 hidden h-[75px] w-[107px] overflow-hidden md:block">
          <Image
            src="/images/technology-stack/header-top.jpg"
            alt=""
            fill
            sizes="107px"
            className="object-cover"
          />
        </div>

        <div className="hidden md:block">
          <p className="text-mono-s absolute left-[714px] top-3 w-[226px] text-brand-dark-green">
            {t('introTop')}
          </p>
          <p className="text-mono-s absolute left-[1190px] top-3 w-[226px] text-brand-dark-green">
            {t('introSide')}
          </p>
          <p className="text-mono-s absolute left-[714px] top-[322px] w-[226px] text-brand-dark-green">
            {t('introBody')}
          </p>
        </div>

        <div className="md:hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="relative h-[75px] w-[107px] shrink-0 overflow-hidden">
              <Image
                src="/images/technology-stack/header-top.jpg"
                alt=""
                fill
                sizes="107px"
                className="object-cover"
              />
            </div>

            <p className="text-mono-s w-[178px] text-brand-dark-green">
              {`${t('introTop')} ${t('introSide')}`}
            </p>
          </div>
        </div>

        <h1 className="text-h2 relative left-1/2 mt-8 w-[464px] max-w-none -translate-x-1/2 text-center text-brand-dark-green md:absolute md:left-[476px] md:top-[127px] md:mt-0 md:translate-x-0">
          {t('heading')}
        </h1>

        <p className="text-mono-s mt-7 ml-auto w-[178px] text-brand-dark-green md:hidden">
          {t('introBody')}
        </p>
      </div>
    </section>
  )
}
