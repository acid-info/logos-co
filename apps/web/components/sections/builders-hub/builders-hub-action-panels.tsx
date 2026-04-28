import Image from 'next/image'

import type { BuilderHubSettings } from '@repo/content/schemas'

import { Button } from '@/components/ui'

type ActionPanel = BuilderHubSettings['actionPanels'][number]
type OfficeHours = NonNullable<BuilderHubSettings['officeHours']>

type Props = {
  panels: ActionPanel[]
  officeHours?: OfficeHours
}

/**
 * Action panels row on the Builders Hub home (Figma 40009046:24159 desktop,
 * 40009046:23906 mobile). Two panels side-by-side on desktop (702 × 500 each),
 * stacked on mobile (369 × 270 each).
 *
 * The first panel uses an image-overlay variant; office hours renders as a
 * flat panel with no background image.
 */
export function BuildersHubActionPanels({ panels, officeHours }: Props) {
  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3 py-10 flex flex-col gap-3 md:flex-row">
        {panels.map((panel, index) => (
          <ImageOverlayPanel key={index} panel={panel} />
        ))}
        {officeHours ? <OfficeHoursPanel data={officeHours} /> : null}
      </div>
    </section>
  )
}

function ImageOverlayPanel({ panel }: { panel: ActionPanel }) {
  return (
    <div className="relative w-full md:w-1/2 h-[270px] md:h-[500px] rounded-[12px] overflow-hidden">
      {panel.image ? (
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      ) : null}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h3 className="font-sans text-[18px] leading-[1.2] text-brand-dark-green max-w-[432px] md:text-[18px]">
          {panel.title}
        </h3>
        {panel.description ? (
          <p className="mt-3 font-mono text-[10px] leading-[1.3] text-brand-dark-green max-w-[380px]">
            {panel.description}
          </p>
        ) : null}
        <div className="mt-6">
          <Button
            href={panel.cta.href}
            variant="secondary"
            {...(panel.cta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {panel.cta.label}
          </Button>
        </div>
      </div>
    </div>
  )
}

function OfficeHoursPanel({ data }: { data: OfficeHours }) {
  return (
    <div className="relative w-full md:w-1/2 h-[270px] md:h-[500px] rounded-[12px] bg-brand-off-white border border-brand-dark-green/10 overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h3 className="font-sans text-[18px] leading-[1.2] text-brand-dark-green">
          {data.title}
        </h3>
        <p className="mt-3 font-mono text-[10px] leading-[1.3] text-brand-dark-green max-w-[380px]">
          {data.description}
        </p>
        <div className="mt-6">
          <Button
            href={data.cta.href}
            variant="primary"
            {...(data.cta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {data.cta.label}
          </Button>
        </div>
      </div>
    </div>
  )
}
