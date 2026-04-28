import { LogosMark, ViewToggle } from '@repo/ui'
import type { CTA } from '@repo/content/schemas'

import { Button } from '@/components/ui'
import { Link } from '@/i18n/navigation'

type View = 'grid' | 'list'

type Props = {
  title: string
  description?: string
  submitCta?: CTA
  view: View
  /** Builds the href for switching to a given view (server-side toggle). */
  buildViewHref?: (view: View) => string
  onViewChange?: (view: View) => void
  mobileDescription?: string
  mobileSpacious?: boolean
  eyebrow?: string
  backHref?: string
  backLabel?: string
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
  onViewChange,
  mobileDescription,
  mobileSpacious = false,
  eyebrow,
  backHref,
  backLabel = 'builders hub',
}: Props) {
  const mobileCopy = mobileDescription ?? description
  const mobileTopClass = mobileSpacious ? 'pt-10' : 'pt-0'
  const mobileDescriptionMarginClass = mobileSpacious ? 'mt-[42px]' : 'mt-6'
  const mobileToggleMarginClass = mobileSpacious ? 'mt-10' : 'mt-6'

  return (
    <header
      className={`relative w-full ${mobileTopClass} md:min-h-[154px] md:pt-10`}
    >
      {backHref ? (
        <Link
          href={backHref}
          className="absolute top-[-20px] left-0 inline-flex items-center gap-2 font-mono text-[10px] leading-[1.3] text-brand-dark-green uppercase hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark-green"
        >
          <span aria-hidden="true">←</span>
          <span>{backLabel}</span>
        </Link>
      ) : null}
      {!backHref && eyebrow ? (
        <p className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[10px] leading-[1.3] text-brand-dark-green uppercase">
          {eyebrow}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-4 md:grid md:grid-cols-12 md:items-start md:gap-3">
        <div className="flex items-center gap-3 md:col-span-4">
          <LogosMark size={20} className="shrink-0 text-brand-dark-green" />
          <h1 className="font-display text-[30px] leading-none text-brand-dark-green md:text-[112px]">
            {title}
          </h1>
        </div>

        <div className="hidden md:col-span-3 md:col-start-7 md:block">
          {description ? (
            <p className="max-w-[342px] font-mono text-[10px] leading-[1.3] text-brand-dark-green">
              {description}
            </p>
          ) : null}
        </div>

        {submitCta ? (
          <Button
            href={submitCta.href}
            variant="secondary"
            className="border-0 px-0 py-0 md:col-span-2 md:col-start-11 md:self-start md:border md:border-brand-dark-green/50 md:px-3 md:py-2"
            {...(submitCta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {submitCta.label}
          </Button>
        ) : null}
      </div>

      {mobileCopy ? (
        <p
          className={`${mobileDescriptionMarginClass} font-mono text-[10px] leading-[1.3] text-brand-dark-green md:hidden`}
        >
          {mobileCopy}
        </p>
      ) : null}

      <div
        className={`${mobileToggleMarginClass} grid md:mt-[34px] md:grid-cols-12 md:gap-3`}
      >
        {onViewChange ? (
          <ViewToggle
            view={view}
            options={[
              { id: 'grid', label: 'Grid' },
              { id: 'list', label: 'List' },
            ]}
            onChange={(id) => onViewChange(id as View)}
            className="md:col-span-2 md:col-start-7"
          />
        ) : (
          <ViewToggle
            view={view}
            options={[
              { id: 'grid', label: 'Grid' },
              { id: 'list', label: 'List' },
            ]}
            getHref={(id) => buildViewHref?.(id as View) ?? '#'}
            className="md:col-span-2 md:col-start-7"
          />
        )}
      </div>
    </header>
  )
}
