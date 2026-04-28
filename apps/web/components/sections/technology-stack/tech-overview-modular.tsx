import Image from 'next/image'

import type { FeaturedTextSection } from '@repo/content/schemas'

const MODULAR_CLIP_PATH = 'inset(0 round 900px)'

type Props = {
  data: FeaturedTextSection
}

export default function TechOverviewModular({ data }: Props) {
  return (
    <section className="bg-brand-off-white px-3 py-10">
      <div className="mx-auto max-w-354">
        <div className="relative">
          <div className="relative z-10 overflow-hidden rounded-[900px] bg-brand-off-white aspect-[369/1209] md:aspect-[1416/1920]">
            <Image
              src="/images/technology-stack/modular-landscape.jpg"
              alt=""
              fill
              sizes="(max-width: 767px) 369px, 1416px"
              className="object-cover object-center"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ clipPath: MODULAR_CLIP_PATH }}
          >
            <div className="absolute inset-x-0 bottom-[-100svh] top-[-100svh]">
              <div className="sticky top-0 h-svh">
                <div className="flex h-full items-center justify-center px-8 md:px-0">
                  <div className="flex w-full max-w-[329px] flex-col items-center gap-[60px] text-center md:max-w-[809px] md:gap-[46px]">
                    <h2 className="text-h1 text-brand-off-white">
                      <span className="text-accent-light-blue">
                        {data.title.highlight}
                      </span>
                      <span>{` ${data.title.rest}`}</span>
                    </h2>

                    {data.body && data.body.length > 0 ? (
                      <div className="text-body-sans flex flex-col gap-3 text-brand-off-white md:max-w-[809px]">
                        {data.body.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
