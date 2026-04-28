import Image from 'next/image'

import { LogosMark } from '@repo/ui'
import type { CtaPanelSection } from '@repo/content/schemas'

import { Button } from '@/components/ui'

function SectionEyebrow({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div className={`flex items-start gap-25.5 ${className}`}>
      <LogosMark size={9} className="shrink-0 text-brand-dark-green" />
      <p className="text-eyebrow w-46.25 text-brand-dark-green">{label}</p>
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
        className="object-cover object-[center_49%]"
        priority
      />
    </div>
  )
}

type Props = {
  data: CtaPanelSection
}

export default function BlockchainPrivacy({ data }: Props) {
  return (
    <section className="bg-gray-01">
      {/* Desktop: 1440×600 row with 702w text column + 702w image column */}
      <div className="mx-auto hidden max-w-360 p-3 md:block">
        <div className="flex h-144 items-center justify-between">
          <div className="flex h-full w-175.5 flex-col justify-between">
            {data.eyebrow ? <SectionEyebrow label={data.eyebrow} /> : null}

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-brand-dark-green">
                <p className="text-h4-sans w-94.25">{data.title}</p>
                {data.description ? (
                  <p className="w-121.25 font-sans text-[12px] leading-[1.2] font-medium">
                    {data.description}
                  </p>
                ) : null}
              </div>
              {data.cta ? (
                <Button href={data.cta.href} variant="primary" className="w-fit cursor-pointer">
                  {data.cta.label}
                </Button>
              ) : null}
            </div>

            {data.eyebrow ? (
              <SectionEyebrow label={data.eyebrow} className="opacity-0" />
            ) : null}
          </div>

          <PrivacyImage className="h-full w-175.5" />
        </div>
      </div>

      {/* Mobile: stacked — text block (288h) + image (288h) */}
      <div className="mx-auto flex max-w-360 flex-col gap-3 p-3 md:hidden">
        <div className="flex h-72 flex-col justify-between">
          {data.eyebrow ? <SectionEyebrow label={data.eyebrow} /> : null}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-brand-dark-green">
              <p className="text-h4-sans">{data.title}</p>
              {data.description ? (
                <p className="font-sans text-[12px] leading-[1.2] font-medium">
                  {data.description}
                </p>
              ) : null}
            </div>
            {data.cta ? (
              <Button href={data.cta.href} variant="primary" className="w-fit cursor-pointer">
                {data.cta.label}
              </Button>
            ) : null}
          </div>

          {data.eyebrow ? (
            <SectionEyebrow label={data.eyebrow} className="opacity-0" />
          ) : null}
        </div>

        <PrivacyImage sizes="100vw" className="h-72 w-full" />
      </div>
    </section>
  )
}
