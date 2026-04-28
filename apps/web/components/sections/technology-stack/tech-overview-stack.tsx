import type { TechStackOverviewSection } from '@repo/content/schemas'

import { StackCard, StackRow } from './stack-item'

const cardClassName =
  'border-brand-dark-green/50 hover:border-brand-dark-green h-64.5 md:h-91.5'
const rowClassName =
  'border-brand-dark-green/50 hover:border-brand-dark-green h-35 md:h-49'

type Props = {
  data: TechStackOverviewSection
  /**
   * Where the networking row links to. Page-level concern (the section
   * fixture covers the four pillars; the networking row is a shared link
   * across pages).
   */
  networkingHref: string
  /** Where the foundation row links to. Same rationale as `networkingHref`. */
  foundationHref: string
}

export default function TechOverviewStack({
  data,
  networkingHref,
  foundationHref,
}: Props) {
  const [networkLine1, networkLine2] = data.networkingTitle.split('\n')

  return (
    <section className="bg-brand-off-white px-3 pb-10 md:pb-10">
      <div className="mx-auto max-w-354">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {data.pillars.map((pillar) => (
            <StackCard
              key={pillar.id}
              label={pillar.title}
              href={pillar.href}
              className={cardClassName}
            />
          ))}
        </div>

        <div className="mt-3 space-y-3">
          <StackRow href={networkingHref} className={rowClassName}>
            <span className="block">{networkLine1}</span>
            {networkLine2 ? <span className="block">{networkLine2}</span> : null}
          </StackRow>
          <StackRow href={foundationHref} className={rowClassName}>
            {data.foundationTitle}
          </StackRow>
        </div>
      </div>
    </section>
  )
}
