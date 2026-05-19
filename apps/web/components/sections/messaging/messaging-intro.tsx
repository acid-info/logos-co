import Image from 'next/image'

import { TechTextSplitSection } from '@acid-info/logos-ui'
import type { CtaPanelSection } from '@repo/content/schemas'

import { SectionMarker } from './messaging-shared'

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
  /** First block — shared blockchain-style split text overview. */
  privacy: CtaPanelSection
  /** Second block — eyebrow + title + body (no CTA) with the LMN image. */
  lmn: CtaPanelSection
}

export default function MessagingIntro({ privacy, lmn }: Props) {
  return (
    <>
      <TechTextSplitSection
        title={privacy.title}
        body={
          privacy.description
            ? privacy.description
                .split('\n\n')
                .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            : null
        }
      />

      <section className="bg-gray-01">
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
    </>
  )
}
