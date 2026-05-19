import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { LogosMark } from '../../icons/logos-mark'

type Tone = 'dark' | 'light'

export type SectionMarkerProps = {
  label: string
  className?: string
}

export function SectionMarker({ label, className }: SectionMarkerProps) {
  return (
    <div className={twMerge('flex items-start gap-[102px]', className)}>
      <LogosMark size={9} className="mt-0 shrink-0 text-brand-dark-green" />
      <p className="text-eyebrow w-46.25 text-brand-dark-green">{label}</p>
    </div>
  )
}

export function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.75 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 2.75V10.5M7.5 10.5L4.25 7.25M7.5 10.5L10.75 7.25M3 12.25H12"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

export type TechDetailHeroItem = {
  title: string
  description?: string
}

export type TechDetailHeroStatus = {
  label: string
  body: string
  cta?: ReactNode
  secondaryCta?: ReactNode
}

export type TechDetailHeroProps = {
  backLink: ReactNode
  title: string
  body?: string
  bodySecondary?: string
  items?: readonly TechDetailHeroItem[]
  status?: TechDetailHeroStatus
  actions?: ReactNode
  titleIcon?: ReactNode
  className?: string
}

export function TechDetailHero({
  backLink,
  title,
  body,
  bodySecondary,
  items,
  status,
  actions,
  titleIcon,
  className,
}: TechDetailHeroProps) {
  return (
    <section
      className={twMerge('bg-brand-off-white pt-5 md:pt-7.5', className)}
    >
      <div className="relative z-51 mx-auto max-w-360 px-3">{backLink}</div>

      <div className="mx-auto grid max-w-360 gap-5 px-3 pt-4 pb-2 text-brand-dark-green md:grid-cols-4 md:gap-3 md:pt-7.5 md:pb-23">
        <h1 className="text-h3-serif flex self-start items-center gap-3 md:col-span-2">
          {titleIcon ?? (
            <LogosMark size={42} className="shrink-0 text-gray-03" />
          )}
          {title}
        </h1>

        <div className="flex flex-col gap-6 md:col-span-2 md:grid md:grid-cols-2 md:gap-3">
          <div className="flex flex-col gap-6">
            {body ? (
              <p className="text-mono-s max-w-86 text-black">{body}</p>
            ) : null}

            {bodySecondary ? (
              <div className="text-mono-s flex flex-col gap-3 text-black">
                <p>{bodySecondary}</p>
                {items?.map((item) => (
                  <p key={item.title}>
                    <span className="font-mono font-semibold">
                      {item.title}
                    </span>
                    {item.description ? ` — ${item.description}` : null}
                  </p>
                ))}
              </div>
            ) : null}

            {status ? (
              <div className="border-brand-dark-green/10 flex flex-col gap-3 border-t pt-6 md:gap-6">
                <span className="text-eyebrow w-fit rounded bg-brand-yellow px-1 py-0.5 text-brand-dark-green">
                  {status.label}
                </span>
                <p className="text-mono-s max-w-86 text-black">{status.body}</p>
                <div className="flex flex-wrap items-center gap-3">
                  {status.cta}
                  {status.secondaryCta}
                </div>
              </div>
            ) : null}
          </div>

          {actions ? (
            <div className="order-first flex flex-wrap items-start gap-3 md:order-none md:justify-end">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export type TechBuilderCtaCard = {
  title: string
  description?: string
  cta?: ReactNode
  image?: ReactNode
}

export type TechTextSplitSectionProps = {
  title: ReactNode
  body?: ReactNode
  className?: string
  contentClassName?: string
}

export function TechTextSplitSection({
  title,
  body,
  className,
  contentClassName,
}: TechTextSplitSectionProps) {
  return (
    <section
      className={twMerge(
        'border-brand-dark-green/10 bg-brand-off-white border-t',
        className
      )}
    >
      <div className="mx-auto grid max-w-360 gap-10 px-3 py-10 text-brand-dark-green md:grid-cols-4 md:gap-3 md:pt-[22px] md:pb-[118px]">
        <h2 className="text-h4-sans md:col-span-2">{title}</h2>

        <div
          className={twMerge(
            'text-mono-s flex min-w-0 max-w-86 flex-col gap-5 break-words md:col-span-2',
            contentClassName
          )}
        >
          {body}
        </div>
      </div>
    </section>
  )
}

export type TechBuilderCtaDeckProps = {
  cards: readonly TechBuilderCtaCard[]
  className?: string
  deckClassName?: string
  cardClassName?: string
  builderHubClassName?: string
  builderHubImageClassName?: string
  logosAppClassName?: string
  contentWrapperClassName?: string
}

export function TechBuilderCtaCardContent({
  title,
  body,
  cta,
  tone,
  wrapperClassName,
}: {
  title: string
  body?: string
  cta?: ReactNode
  tone: Tone
  wrapperClassName?: string
}) {
  const textColor =
    tone === 'dark' ? 'text-brand-dark-green' : 'text-brand-off-white'

  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center gap-10',
        wrapperClassName
      )}
    >
      <div
        className={twMerge(
          'flex w-full max-w-108 flex-col items-center gap-3 px-4 text-center',
          textColor
        )}
      >
        <p className="text-subhead-sans w-full">{title}</p>
        {body ? <p className="text-mono-s w-full max-w-95">{body}</p> : null}
      </div>
      {cta}
    </div>
  )
}

export function TechBuilderCtaDeck({
  cards,
  className,
  deckClassName,
  cardClassName,
  builderHubClassName,
  builderHubImageClassName,
  logosAppClassName,
  contentWrapperClassName,
}: TechBuilderCtaDeckProps) {
  const [docsCard, builderHubCard, logosAppCard] = cards

  return (
    <section className={twMerge('bg-brand-off-white', className)}>
      <div
        className={twMerge(
          'mx-auto flex max-w-360 flex-col gap-3 px-3 py-10 md:flex-row md:items-start',
          deckClassName
        )}
      >
        {docsCard ? (
          <div
            className={twMerge(
              'flex h-75 w-full flex-col items-center justify-center overflow-hidden border border-brand-dark-green p-4 md:h-125 md:flex-1',
              cardClassName
            )}
          >
            <TechBuilderCtaCardContent
              title={docsCard.title}
              body={docsCard.description}
              tone="dark"
              wrapperClassName={contentWrapperClassName}
              cta={docsCard.cta}
            />
          </div>
        ) : null}

        {builderHubCard ? (
          <div
            className={twMerge(
              'relative h-75 w-full overflow-hidden rounded-[200px] bg-brand-dark-green md:h-125 md:flex-1',
              builderHubClassName
            )}
          >
            {builderHubCard.image ? (
              <div
                className={twMerge(
                  'pointer-events-none absolute inset-0 overflow-hidden [&>*]:size-full [&>*]:object-cover',
                  builderHubImageClassName
                )}
              >
                {builderHubCard.image}
              </div>
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center">
              <TechBuilderCtaCardContent
                title={builderHubCard.title}
                body={builderHubCard.description}
                tone="light"
                wrapperClassName={contentWrapperClassName}
                cta={builderHubCard.cta}
              />
            </div>
          </div>
        ) : null}

        {logosAppCard ? (
          <div
            className={twMerge(
              'flex h-75 w-full flex-col items-center justify-center overflow-hidden rounded-[60px] bg-gray-01 p-4 md:h-125 md:flex-1',
              logosAppClassName
            )}
          >
            <TechBuilderCtaCardContent
              title={logosAppCard.title}
              body={logosAppCard.description}
              tone="dark"
              wrapperClassName={contentWrapperClassName}
              cta={logosAppCard.cta}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export type TechCaseStudyCardProps = {
  title: string
  body: ReactNode
  image: ReactNode
  cta?: ReactNode
  markerLabel: string
  className?: string
  contentClassName?: string
  imageClassName?: string
}

export function TechCaseStudyCard({
  title,
  body,
  image,
  cta,
  markerLabel,
  className,
  contentClassName,
  imageClassName,
}: TechCaseStudyCardProps) {
  return (
    <article
      className={twMerge(
        'relative h-[299px] overflow-hidden rounded-xl border border-brand-dark-green/50 md:h-[406px] md:flex-1',
        className
      )}
    >
      <div
        className={twMerge(
          'absolute top-3 left-3 flex h-[263px] w-[348px] flex-col justify-between md:h-[380px] md:w-[453px]',
          contentClassName
        )}
      >
        <SectionMarker
          label={markerLabel}
          className="scale-[0.98] origin-left"
        />

        <div className="flex flex-col gap-6 text-brand-dark-green">
          <h3 className="text-subhead-sans w-[195px] md:w-57">{title}</h3>
          <div className="text-mono-s w-[344px] md:w-[453px]">{body}</div>
        </div>
      </div>

      {cta ? (
        <div className="absolute top-3 right-3 hidden md:block">{cta}</div>
      ) : null}

      <div className={imageClassName}>{image}</div>
    </article>
  )
}
