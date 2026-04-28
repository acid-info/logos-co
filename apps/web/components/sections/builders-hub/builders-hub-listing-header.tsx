import { LogosMark, ViewToggle } from '@repo/ui'
import type { CTA } from '@repo/content/schemas'

import { Button } from '@/components/ui'

type View = 'grid' | 'list'

type Props = {
  title: string
  description?: string
  submitCta?: CTA
  view: View
  /** Builds the href for switching to a given view (server-side toggle). */
  buildViewHref: (view: View) => string
  /** Optional eyebrow at top center of the header. */
  eyebrow?: string
}

/**
 * Listing-page header used by /builders-hub/{rfps,ideas}. Renders the page
 * title with logomark, the eyebrow description, the optional `Submit …` CTA,
 * and the Grid / List view toggle.
 *
 * Figma references: RFPs desktop 40009046:25012 frame, mobile 40009046:24924.
 */
export function BuildersHubListingHeader({
  title,
  description,
  submitCta,
  view,
  buildViewHref,
  eyebrow,
}: Props) {
  return (
    <header className="relative w-full pb-6">
      {/* Top eyebrow strip (page label) */}
      {eyebrow ? (
        <p className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[10px] leading-[1.3] text-black uppercase">
          {eyebrow}
        </p>
      ) : null}

      {/* Title row: λ + title (left) and submit CTA (right).
          Mobile: title takes full width; submit CTA wraps below. */}
      <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-start md:justify-between md:gap-3">
        <div className="flex items-center gap-3">
          <LogosMark size={20} className="text-brand-dark-green shrink-0" />
          <h1 className="text-h3-serif text-brand-dark-green leading-none">
            {title}
          </h1>
        </div>
        {submitCta ? (
          <Button
            href={submitCta.href}
            variant="secondary"
            className="self-start"
            {...(submitCta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {submitCta.label}
          </Button>
        ) : null}
      </div>

      {/* Description + view toggle */}
      <div className="mt-6 flex flex-col gap-4 md:mt-10 md:flex-row md:items-end md:justify-between">
        {description ? (
          <p className="font-mono text-[10px] leading-[1.3] text-black max-w-[369px] md:max-w-[464px]">
            {description}
          </p>
        ) : (
          <span />
        )}
        <ViewToggle
          view={view}
          options={[
            { id: 'grid', label: 'Grid' },
            { id: 'list', label: 'List' },
          ]}
          getHref={(id) => buildViewHref(id as View)}
        />
      </div>
    </header>
  )
}
