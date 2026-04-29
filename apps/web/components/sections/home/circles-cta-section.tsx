import type { FeaturedTextSection } from '@repo/content/schemas'

import { Button } from '@/components/ui'
import { fetchCircleEvents } from '@/lib/circle-events'

import CirclesMapLoader from './circles-map-loader'

type Props = {
  data: FeaturedTextSection
}

export default async function CirclesCtaSection({ data }: Props) {
  const events = await fetchCircleEvents()

  return (
    <section className="bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        {/* Headline + body + CTAs */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-h1 text-brand-dark-green">
            <span className="text-brand-yellow">{data.title.highlight}</span>{' '}
            {data.title.rest}
          </h2>

          {data.body && data.body.length > 0 ? (
            <div className="text-mono-s text-brand-dark-green/70 mt-10 max-w-114 flex flex-col gap-3">
              {data.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex items-center gap-4">
            {data.cta ? (
              <Button
                href={data.cta.href}
                className="transition-opacity hover:opacity-70"
              >
                {data.cta.label}
              </Button>
            ) : null}
            {data.secondaryCta ? (
              <Button
                href={data.secondaryCta.href}
                variant="link"
                className="transition-opacity hover:opacity-70"
              >
                {data.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        {/* World map */}
        <div className="bg-gray-01 mt-14 aspect-1416/710 overflow-hidden rounded-[100px]">
          <CirclesMapLoader events={events} />
        </div>
      </div>
    </section>
  )
}
