import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button, LogosMark } from '@repo/ui'

function SectionEyebrow({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div className={`flex items-start gap-[102px] ${className}`}>
      <LogosMark size={9} className="shrink-0 text-brand-dark-green" />
      <p className="text-eyebrow w-[185px] text-brand-dark-green">{label}</p>
    </div>
  )
}

/**
 * Privacy image — matches Figma node 40009046:21149 / 21042
 * Figma crops a tall source (2560×3200, aspect 0.8) inside a wider container
 * with a +11.5 px Y offset from centre, sampling image rows 140..716 of the
 * 879-px display height. Mobile does the same with y=-75 in a 288-tall box.
 */
function PrivacyImage({
  sizes = '702px',
  className = '',
}: {
  sizes?: string
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gray-02 ${className}`}
    >
      <Image
        src="/images/blockchain/privacy.jpg"
        alt=""
        fill
        sizes={sizes}
        className="object-cover object-[center_47%]"
        priority
      />
    </div>
  )
}

export default async function BlockchainPrivacy() {
  const t = await getTranslations('pages.blockchain.privacy')

  return (
    <section className="bg-gray-01">
      {/* Desktop: 1440×600 row with 702w text column + 702w image column */}
      <div className="mx-auto hidden max-w-354 p-3 md:block">
        <div className="flex h-[576px] items-center gap-3">
          <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
            <SectionEyebrow label={t('eyebrow')} />

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-brand-dark-green">
                <p className="text-h4-sans w-[377px]">{t('title')}</p>
                <p className="w-[485px] font-sans text-[12px] leading-[1.2] font-medium">
                  {t('body')}
                </p>
              </div>
              <Button href="#" variant="primary" className="w-fit cursor-pointer">
                {t('cta')}
              </Button>
            </div>

            <SectionEyebrow label="Storage" className="opacity-0" />
          </div>

          <PrivacyImage className="h-full min-w-0 flex-1" />
        </div>
      </div>

      {/* Mobile: stacked — text block (288h) + image (288h) */}
      <div className="mx-auto flex max-w-354 flex-col gap-3 p-3 md:hidden">
        <div className="flex h-[288px] flex-col justify-between">
          <SectionEyebrow label={t('eyebrow')} />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-brand-dark-green">
              <p className="text-h4-sans">{t('title')}</p>
              <p className="font-sans text-[12px] leading-[1.2] font-medium">
                {t('body')}
              </p>
            </div>
            <Button href="#" variant="primary" className="w-fit cursor-pointer">
              {t('cta')}
            </Button>
          </div>

          <SectionEyebrow label="Storage" className="opacity-0" />
        </div>

        <PrivacyImage sizes="100vw" className="h-[288px] w-full" />
      </div>
    </section>
  )
}
