import Image from 'next/image'

import type { CtaPanelSection } from '@repo/content/schemas'

import { IconMask } from '@/components/icons/icon-mask'
import { Button } from '@/components/ui'

function MarkerIcon() {
  return (
    <IconMask
      src="/icons/storage-marker.svg"
      className="h-[9px] w-[7px] text-brand-dark-green"
    />
  )
}

function SectionMarker({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-[102px]">
      <MarkerIcon />
      <p className="text-eyebrow w-[185px] text-brand-dark-green">{label}</p>
    </div>
  )
}

type Props = {
  data: CtaPanelSection
}

export default function StorageMain({ data }: Props) {
  // Title supports `\n` for visual line breaks (currently rendered with <br />).
  const titleLines = data.title.split('\n')

  return (
    <section className="mt-15 bg-brand-off-white md:mt-25">
      <div className="mx-auto h-[600px] max-w-360 bg-gray-01 p-3">
        <div className="flex h-full flex-col md:flex-row md:gap-3">
          <div className="flex h-72 flex-col justify-between md:h-full md:w-[calc((100%-12px)/2)]">
            {data.eyebrow ? <SectionMarker label={data.eyebrow} /> : null}

            <div className="flex flex-col items-start gap-6 md:mb-[207px] md:justify-center">
              <div className="flex flex-col gap-3 text-brand-dark-green">
                <h2 className="text-h4-sans w-full max-w-[377px]">
                  {titleLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                {data.description ? (
                  <p className="text-caption-sans w-full max-w-[485px] font-medium">
                    {data.description}
                  </p>
                ) : null}
              </div>
              {data.cta ? (
                <Button href={data.cta.href} variant="primary">
                  {data.cta.label}
                </Button>
              ) : null}
            </div>
          </div>

          <div className="relative h-72 overflow-hidden rounded-3xl md:h-full md:w-[calc((100%-12px)/2)]">
            <Image
              src="/images/storage/hero.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_66%] md:object-[50%_46%]"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
