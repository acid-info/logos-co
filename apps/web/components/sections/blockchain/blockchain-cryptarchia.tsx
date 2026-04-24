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

function Card({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex items-start rounded-xl bg-gray-01 p-3">
      <div className="flex flex-1 flex-col gap-0.5 pr-1.5">
        <p className="text-eyebrow text-brand-dark-green">{label}</p>
        <p className="text-mono-s text-brand-dark-green">{body}</p>
      </div>
    </div>
  )
}

/**
 * Cryptarchia image — matches Figma node 40009046:21154 / 40009046:21057
 * Source asset 2560×3200 is displayed at 755×943 and positioned at
 * (-28, -172) inside a 702×576 container. On mobile the container is
 * 369×576 — same over-sized image crop starting from the left.
 */
function CryptarchiaImage({
  sizes = '702px',
  className = '',
  children,
}: {
  sizes?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <Image
        src="/images/blockchain/cryptarchia.jpg"
        alt=""
        width={755}
        height={943}
        sizes={sizes}
        className="absolute top-[-172px] left-[-28px] h-[943px] w-[755px] max-w-none object-cover"
      />
      {children}
    </div>
  )
}

export default async function BlockchainCryptarchia() {
  const t = await getTranslations('pages.blockchain.cryptarchia')

  const blendCard = {
    label: t('blendNetworkLabel'),
    body: t('blendNetworkBody'),
  }
  const lezCard = { label: t('lezLabel'), body: t('lezBody') }

  return (
    <section className="bg-gray-02">
      {/* Desktop: 1440×600, image left + centered text right */}
      <div className="mx-auto hidden max-w-354 p-3 md:block">
        <div className="flex h-[576px] items-start gap-3">
          <CryptarchiaImage className="h-[576px] min-w-0 flex-1">
            <div className="absolute right-3 bottom-3 left-3 flex items-start gap-3">
              <div className="flex-1">
                <Card {...blendCard} />
              </div>
              <div className="flex-1">
                <Card {...lezCard} />
              </div>
            </div>
          </CryptarchiaImage>

          <div className="flex h-full min-w-0 flex-1 flex-col justify-between pb-3">
            <SectionEyebrow label={t('eyebrow')} />

            <div className="flex flex-col items-center justify-center gap-1.5 text-center text-brand-dark-green">
              <p className="text-h4-sans w-[214px]">{t('title')}</p>
              <p className="w-[305px] font-sans text-[12px] leading-[1.2] font-medium">
                {t('body')}
              </p>
            </div>

            <SectionEyebrow label={t('eyebrow')} className="opacity-0" />
          </div>
        </div>
      </div>

      {/* Mobile: stacked — text (288h) + image (576h with 2 cards at bottom) */}
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

        <CryptarchiaImage sizes="100vw" className="h-[576px] w-full">
          <div className="absolute right-3 bottom-3 left-3 flex flex-col gap-3">
            <Card {...blendCard} />
            <Card {...lezCard} />
          </div>
        </CryptarchiaImage>
      </div>
    </section>
  )
}
