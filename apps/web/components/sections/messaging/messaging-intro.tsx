import Image from 'next/image'

import type { CtaPanelSection } from '@repo/content/schemas'

import { Button } from '@/components/ui'

import { SectionMarker } from './messaging-shared'

function PrivacyImage() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-gray-02 md:h-144 md:w-175.5">
      <Image
        src="/images/messaging/privacy.webp"
        alt=""
        width={743}
        height={778}
        priority
        sizes="(min-width: 768px) 702px, 369px"
        className="absolute top-[-78px] left-0 h-[387px] w-[369px] max-w-none object-cover md:top-[-169.5px] md:h-[778px] md:w-[743px]"
      />
    </div>
  )
}

function LmnImage() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-gray-02 md:h-144 md:w-175.5">
      <Image
        src="/images/messaging/lmn.webp"
        alt=""
        width={746}
        height={933}
        sizes="(min-width: 768px) 702px, 369px"
        className="absolute top-[-93px] left-[-28px] h-[497px] w-[397px] max-w-none object-cover md:top-[-167px] md:h-[933px] md:w-[746px]"
      />
    </div>
  )
}

type Props = {
  /** First block — eyebrow + title + body + cta with the Privacy image. */
  privacy: CtaPanelSection
  /** Second block — eyebrow + title + body (no CTA) with the LMN image. */
  lmn: CtaPanelSection
}

export default function MessagingIntro({ privacy, lmn }: Props) {
  return (
    <div className="mt-15 md:mt-10">
      <section className="bg-gray-01">
        <div className="mx-auto flex max-w-360 flex-col p-3 md:h-150 md:flex-row md:items-start md:justify-between">
          <PrivacyImage />

          <div className="order-first flex h-72 flex-col justify-between md:order-none md:h-144 md:w-175.5 md:justify-start">
            {privacy.eyebrow ? <SectionMarker label={privacy.eyebrow} /> : null}

            <div className="flex flex-col gap-6 md:mt-[194.5px]">
              <div className="flex flex-col gap-3 text-brand-dark-green">
                <h2 className="text-h4-sans w-full md:w-94.25">{privacy.title}</h2>
                {privacy.description ? (
                  <p className="font-sans text-[12px] leading-[1.2] font-medium md:w-121.25">
                    {privacy.description}
                  </p>
                ) : null}
              </div>
              {privacy.cta ? (
                <Button href={privacy.cta.href} variant="primary" className="w-fit">
                  {privacy.cta.label}
                </Button>
              ) : null}
            </div>

            <SectionMarker label="Storage" className="opacity-0 md:mt-auto" />
          </div>
        </div>
      </section>

      <section className="bg-brand-off-white">
        <div className="mx-auto flex max-w-360 flex-col p-3 md:h-150 md:flex-row md:items-start md:justify-between">
          <div className="flex h-72 flex-col md:h-144 md:w-175.5">
            {lmn.eyebrow ? <SectionMarker label={lmn.eyebrow} /> : null}

            <div className="mt-15 flex flex-col gap-3 text-brand-dark-green md:mt-auto">
              <h2 className="text-h4-sans md:w-84">{lmn.title}</h2>
              {lmn.description ? (
                <p className="text-mono-s md:w-121.25">{lmn.description}</p>
              ) : null}
            </div>
          </div>

          <LmnImage />
        </div>
      </section>
    </div>
  )
}
