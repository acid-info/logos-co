import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui'
import { SectionMarker } from './messaging-shared'

type CaseStudyCardProps = {
  desktopTitle: string
  mobileTitle: string
  body: string
  imageSrc: string
  imageClassName: string
}

function CaseStudyCard({
  desktopTitle,
  mobileTitle,
  body,
  imageSrc,
  imageClassName,
}: CaseStudyCardProps) {
  return (
    <article className="relative h-[299px] overflow-hidden rounded-xl border border-brand-dark-green/50 md:h-[406px] md:flex-1">
      <div className="absolute top-3 left-3 flex h-[263px] w-[348px] flex-col justify-between md:h-[380px] md:w-[453px]">
        <SectionMarker
          label="Case Study"
          className="scale-[0.98] origin-left"
        />

        <div className="flex flex-col gap-6 text-brand-dark-green md:gap-6">
          <h3 className="text-subhead-sans w-[195px] md:w-57">
            <span className="hidden md:inline">{desktopTitle}</span>
            <span className="md:hidden">{mobileTitle}</span>
          </h3>
          <p className="text-mono-s w-[344px] md:w-[453px]">{body}</p>
        </div>
      </div>

      <Button
        href="#"
        variant="primary"
        className="absolute top-3 right-3 hidden md:inline-flex"
      >
        learn more
      </Button>

      <div className={imageClassName}>
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
    </article>
  )
}

export default async function MessagingCaseStudies() {
  const t = await getTranslations('pages.messaging.caseStudies')

  const body = t('body')

  return (
    <section className="mt-15 bg-brand-off-white md:mt-10">
      <div className="mx-auto max-w-360 px-3 pt-31 md:px-0 md:pt-25">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3 md:px-3">
          <h2 className="text-h4-sans text-brand-dark-green">{t('title')}</h2>
          <p className="text-mono-s text-brand-dark-green md:w-83.5">
            {t('description')}
          </p>
        </div>

        <div className="mt-15 flex flex-col gap-3 md:mt-10 md:flex-row md:px-3">
          <CaseStudyCard
            desktopTitle={t('statusTitle')}
            mobileTitle={t('nextdoorTitle')}
            body={body}
            imageSrc="/images/messaging/status.webp"
            imageClassName="absolute top-3 right-3 h-[66px] w-[53px] md:top-auto md:right-3 md:bottom-3 md:h-[120px] md:w-24"
          />
          <CaseStudyCard
            desktopTitle={t('railgunTitle')}
            mobileTitle={t('digitalIdTitle')}
            body={body}
            imageSrc="/images/messaging/railgun.webp"
            imageClassName="absolute top-3 right-3 h-[52px] w-[66px] md:top-auto md:right-3 md:bottom-3 md:h-[77px] md:w-24"
          />
        </div>
      </div>
    </section>
  )
}
