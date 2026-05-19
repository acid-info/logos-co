import type { TechStackOverviewSection } from '@repo/content/schemas'
import Image from 'next/image'
import type { ReactNode } from 'react'

import { LogosMark } from '@acid-info/logos-ui'

import { Button, ButtonArrowIcon } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

import { DownloadIcon } from '@/components/sections/shared/builder-cta-card'

const desktopCardClassName = 'h-[366px] w-full'
const desktopRowClassName = 'h-[196px] w-full'
const desktopBasecampRowClassName = 'h-[196px] w-full border-brand-dark-green'
const mobileCardClassName = 'h-[140px] w-full'
const mobileRowClassName = 'h-[105px] w-full'
const mobileBasecampRowClassName = 'h-[105px] w-full border-brand-dark-green'
const hoverThumbnail = '/images/technology-stack/logos-basecamp.jpg'

function formatEyebrow(eyebrow: string) {
  return eyebrow.replaceAll('. ', '.\n')
}

function formatNetworkingTitle(title: string) {
  return title.replace(': ', ':\n')
}

function HoverStackItem({
  title,
  description,
  href,
  ctaLabel = 'Learn More',
  className,
  labelClassName,
  ctaIcon,
  ctaVisibleByDefault = false,
  details,
}: {
  title: string
  description?: string
  href: string
  ctaLabel?: string
  className: string
  labelClassName?: string
  ctaIcon?: ReactNode
  ctaVisibleByDefault?: boolean
  details?: ReadonlyArray<{
    title: string
    body: string
  }>
}) {
  const hasDetails = details !== undefined && details.length > 0

  return (
    <div
      className={`group/stack-item relative flex items-center justify-center overflow-hidden rounded-3xl border border-brand-dark-green px-6 text-center text-brand-dark-green transition-[border-color] duration-300 ease-out hover:border-transparent ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-3xl bg-accent-light-blue opacity-0 scale-[0.985] transition-all duration-300 ease-out group-hover/stack-item:opacity-100 group-hover/stack-item:scale-100" />

      <span className="pointer-events-none absolute top-3 left-3 z-[1] hidden h-[57px] w-[46px] overflow-hidden opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover/stack-item:opacity-100 group-hover/stack-item:translate-y-0 md:block">
        <Image
          src={hoverThumbnail}
          alt=""
          fill
          sizes="46px"
          className="object-cover"
        />
      </span>

      <Button
        href={href}
        icon={ctaIcon}
        className={`absolute top-2.5 right-2.5 z-10 cursor-pointer transition-all duration-300 ease-out md:top-3 md:right-3 ${
          ctaVisibleByDefault
            ? ''
            : 'pointer-events-none opacity-0 translate-y-1 group-hover/stack-item:pointer-events-auto group-hover/stack-item:opacity-100 group-hover/stack-item:translate-y-0 focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:translate-y-0'
        }`}
      >
        {ctaLabel}
      </Button>

      <div
        className={`relative z-[1] flex max-w-[222px] flex-col items-center gap-3 transition-transform duration-300 ease-out ${
          hasDetails ? 'md:group-hover/stack-item:-translate-y-[72px]' : ''
        }`}
      >
        <span
          className={`text-subhead-sans flex items-center gap-2.5 ${labelClassName ?? ''}`}
        >
          <LogosMark size={14} className="shrink-0 text-gray-03" />
          {title}
        </span>
        {description ? (
          <p className="text-mono-s hidden text-center opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover/stack-item:opacity-100 group-hover/stack-item:translate-y-0 md:block">
            {description}
          </p>
        ) : null}
      </div>

      {hasDetails ? (
        <div className="absolute right-3 bottom-3 left-3 z-[1] hidden flex-col gap-3 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/stack-item:flex group-hover/stack-item:opacity-100 group-hover/stack-item:translate-y-0 md:flex">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="rounded-[18px] border border-brand-dark-green/50 px-4 py-3 text-left text-brand-dark-green"
            >
              <p className="font-mono text-[10px] leading-[1.25] font-semibold tracking-[0.08em] uppercase">
                {detail.title}
              </p>
              <p className="mt-1.5 font-mono text-[10px] leading-[1.25]">
                {detail.body}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

type Props = {
  data: TechStackOverviewSection
  /**
   * Where the networking row links to. Page-level concern (the section
   * fixture covers the four pillars; the networking row is a shared link
   * across pages).
   */
  networkingHref: string
  /** Where the foundation row links to. */
  foundationHref: string
}

export default function TechStackSection({
  data,
  networkingHref,
  foundationHref,
}: Props) {
  return (
    <section
      id="tech-stack"
      className="relative h-[1516px] overflow-hidden border-t border-brand-dark-green/10 bg-brand-off-white md:h-[1653px]"
    >
      <div className="relative h-full px-3 md:hidden">
        <p className="text-mono-s absolute top-3 left-3 w-[226px] text-brand-dark-green">
          Disclaimer: This diagram oversimplifies the stack.
        </p>

        {data.eyebrow ? (
          <p className="text-mono-s absolute top-[130px] left-[203px] w-[120px] whitespace-pre-line text-brand-dark-green">
            {formatEyebrow(data.eyebrow)}
          </p>
        ) : null}

        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <Button
            href={ROUTES.buildersHub}
            icon={<ButtonArrowIcon />}
            className="cursor-pointer transition-opacity hover:opacity-70"
          >
            Builder Hub
          </Button>
          {data.cta ? (
            <Button
              href={data.cta.href}
              variant="secondary"
              icon={<ButtonArrowIcon />}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              Documentation
            </Button>
          ) : null}
        </div>

        {data.title ? (
          <h2 className="text-h2 absolute top-[193px] left-1/2 w-[464px] -translate-x-1/2 whitespace-pre-line text-center text-brand-dark-green">
            {data.title}
          </h2>
        ) : null}

        <p className="text-mono-s absolute top-[302px] left-[250px] w-[178px] text-brand-dark-green">
          Private-by-default infrastructure is a requirement to make parallel
          societies possible.
        </p>

        <div className="absolute top-[437px] right-3 left-3">
          {data.basecamp ? (
            <HoverStackItem
              title={data.basecamp.title}
              description={data.basecamp.body}
              href={data.basecamp.cta?.href ?? data.basecamp.href}
              ctaLabel={data.basecamp.cta?.label ?? 'Install'}
              ctaIcon={<DownloadIcon />}
              ctaVisibleByDefault
              className={mobileBasecampRowClassName}
            />
          ) : null}

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.pillars.map((pillar) => (
              <HoverStackItem
                key={pillar.id}
                title={pillar.title}
                description={pillar.body}
                href={pillar.href}
                className={mobileCardClassName}
                details={pillar.details}
              />
            ))}
          </div>

          <div className="mt-3 space-y-3">
            <HoverStackItem
              title={formatNetworkingTitle(data.networkingTitle)}
              description={data.networkingDescription}
              href={networkingHref}
              className={mobileRowClassName}
              labelClassName="whitespace-pre-line"
            />
            <HoverStackItem
              title={data.foundationTitle}
              description={data.foundationDescription}
              href={foundationHref}
              className={mobileRowClassName}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden h-full max-w-[1440px] md:block">
        <p className="text-mono-s absolute top-[11px] left-3 w-[226px] text-brand-dark-green">
          Disclaimer: Abstract representation of the stack.
        </p>

        {data.eyebrow ? (
          <p className="text-mono-s absolute top-[97px] left-[calc(50%+6px)] w-[226px] whitespace-pre-line text-brand-dark-green">
            {formatEyebrow(data.eyebrow)}
          </p>
        ) : null}

        <div className="absolute top-[11px] right-3 flex items-center gap-1.5">
          <Button
            href={ROUTES.buildersHub}
            icon={<ButtonArrowIcon />}
            className="cursor-pointer transition-opacity hover:opacity-70"
          >
            Builder Hub
          </Button>
          {data.cta ? (
            <Button
              href={data.cta.href}
              variant="secondary"
              icon={<ButtonArrowIcon />}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              Documentation
            </Button>
          ) : null}
          <Button
            href={ROUTES.technologyStack}
            variant="secondary"
            icon={<ButtonArrowIcon />}
            className="cursor-pointer transition-opacity hover:opacity-70"
          >
            Specs
          </Button>
        </div>

        {data.title ? (
          <h2 className="text-h2 absolute top-[184px] left-[calc(33.33%+8px)] w-[464px] whitespace-pre-line text-center text-brand-dark-green">
            {data.title}
          </h2>
        ) : null}

        <p className="text-mono-s absolute top-[333px] left-[calc(50%+6px)] w-[226px] text-brand-dark-green">
          Private-by-default infrastructure is a requirement to make parallel
          societies possible.
        </p>

        <div className="absolute top-[517px] left-0 flex w-full flex-col gap-3 px-3">
          {data.basecamp ? (
            <HoverStackItem
              title={data.basecamp.title}
              description={data.basecamp.body}
              href={data.basecamp.cta?.href ?? data.basecamp.href}
              ctaLabel={data.basecamp.cta?.label ?? 'Install'}
              ctaIcon={<DownloadIcon />}
              ctaVisibleByDefault
              className={desktopBasecampRowClassName}
            />
          ) : null}

          <div className="grid w-full grid-cols-4 gap-3">
            {data.pillars.map((pillar) => (
              <HoverStackItem
                key={pillar.id}
                title={pillar.title}
                description={pillar.body}
                href={pillar.href}
                className={desktopCardClassName}
                details={pillar.details}
              />
            ))}
          </div>

          <HoverStackItem
            title={formatNetworkingTitle(data.networkingTitle)}
            description={data.networkingDescription}
            href={networkingHref}
            className={desktopRowClassName}
            labelClassName="whitespace-pre-line"
          />
          <HoverStackItem
            title={data.foundationTitle}
            description={data.foundationDescription}
            href={foundationHref}
            className={desktopRowClassName}
          />
        </div>
      </div>
    </section>
  )
}
