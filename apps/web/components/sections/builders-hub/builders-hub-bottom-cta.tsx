import type { CTA } from '@repo/content/schemas'

import { Button } from '@/components/ui'

type Props = {
  title: string
  cta: CTA
}

/**
 * Bottom call-to-action panel rendered below RFPs / Ideas listing pages.
 * Shape: large heading + single CTA button on a flat background.
 */
export function BuildersHubBottomCta({ title, cta }: Props) {
  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3 py-16 flex flex-col items-center gap-8 text-center">
        <h2 className="text-h3-serif md:text-h2 text-brand-dark-green leading-tight tracking-tight text-balance max-w-[20ch] md:max-w-[24ch]">
          {title}
        </h2>
        <Button
          href={cta.href}
          variant="secondary"
          {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {cta.label}
        </Button>
      </div>
    </section>
  )
}
