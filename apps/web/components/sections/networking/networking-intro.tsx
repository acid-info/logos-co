import type { CtaPanelSection } from '@repo/content/schemas'

import { Button } from '@/components/ui'

type Props = {
  data: CtaPanelSection
}

export default function NetworkingIntro({ data }: Props) {
  // Title supports `\n` for visual line breaks (currently rendered as
  // separate <p> blocks for whitespace-nowrap control on each line).
  const titleLines = data.title.split('\n')

  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3">
        {/* Desktop: three columns, absolute positioning to match Figma */}
        <div className="relative hidden md:block md:h-39.5">
          <div className="text-h4-sans absolute top-[39px] left-0 text-brand-dark-green">
            {titleLines.map((line, i) => (
              <p key={i} className="whitespace-nowrap">
                {line}
              </p>
            ))}
          </div>

          {data.description ? (
            <p className="text-mono-s absolute top-[39px] left-178.5 w-86.25 text-brand-dark-green">
              {data.description}
            </p>
          ) : null}

          {data.cta ? (
            <div className="absolute top-[39px] left-297.5">
              <Button
                href={data.cta.href}
                variant="tertiary"
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                {data.cta.label}
              </Button>
            </div>
          ) : null}
        </div>

        {/* Mobile: vertical stack — title→body gap 12, body→cta gap 24 */}
        <div className="flex flex-col gap-6 pt-10 pb-10 md:hidden">
          <div className="flex flex-col gap-3">
            <div className="text-h4-sans text-brand-dark-green">
              {titleLines.map((line, i) => (
                <p key={i} className="whitespace-nowrap">
                  {line}
                </p>
              ))}
            </div>
            {data.description ? (
              <p className="text-mono-s text-brand-dark-green">{data.description}</p>
            ) : null}
          </div>
          {data.cta ? (
            <Button
              href={data.cta.href}
              variant="tertiary"
              className="w-fit cursor-pointer transition-opacity hover:opacity-70"
            >
              {data.cta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
