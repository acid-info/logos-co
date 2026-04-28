import Image from 'next/image'

import type { TechStackOverviewSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'

import {
  StackCard,
  StackRow,
} from '@/components/sections/technology-stack/stack-item'

const cardClassName =
  'h-[366px] w-full border-brand-dark-green p-1.5 hover:bg-gray-01'
const rowClassName = 'h-[196px] w-full border-brand-dark-green hover:bg-gray-01'

function formatEyebrow(eyebrow: string) {
  return eyebrow.replaceAll('. ', '.\n')
}

function formatNetworkingTitle(title: string) {
  return title.replace(': ', ':\n')
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
      className="relative overflow-hidden border-t border-brand-dark-green/10 bg-brand-off-white md:h-[1272px]"
    >
      <div className="px-3 py-16 md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="relative h-[75px] w-[107px] shrink-0 overflow-hidden">
            <Image
              src="/images/home/build-bg.jpg"
              alt=""
              fill
              sizes="107px"
              className="scale-[1.55] object-cover object-[45%_38%]"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {data.eyebrow ? (
            <p className="text-mono-s w-[226px] whitespace-pre-line text-brand-dark-green">
              {formatEyebrow(data.eyebrow)}
            </p>
          ) : null}
        </div>

        {data.title ? (
          <h2 className="text-h2 mx-auto mt-20 max-w-[464px] text-center text-brand-dark-green">
            {data.title}
          </h2>
        ) : null}

        {data.cta ? (
          <div className="mt-8 flex justify-center">
            <Button
              href={data.cta.href}
              icon={<ButtonArrowIcon />}
              className="transition-opacity hover:opacity-70"
            >
              {data.cta.label}
            </Button>
          </div>
        ) : null}

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          <StackRow
            href={networkingHref}
            className={rowClassName}
            labelClassName="whitespace-pre-line"
          >
            {formatNetworkingTitle(data.networkingTitle)}
          </StackRow>
          <StackRow href={foundationHref} className={rowClassName}>
            {data.foundationTitle}
          </StackRow>
        </div>
      </div>

      <div className="relative mx-auto hidden h-full max-w-[1440px] md:block">
        <div className="absolute top-[11px] left-3 h-[75px] w-[107px] overflow-hidden">
          <Image
            src="/images/home/build-bg.jpg"
            alt=""
            fill
            sizes="107px"
            className="scale-[1.55] object-cover object-[45%_38%]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {data.eyebrow ? (
          <p className="text-mono-s absolute top-[11px] left-[calc(50%+6px)] w-[226px] whitespace-pre-line text-brand-dark-green">
            {formatEyebrow(data.eyebrow)}
          </p>
        ) : null}

        <div className="absolute top-[11px] left-[calc(83.33%+2px)]">
          {data.cta ? (
            <Button
              href={data.cta.href}
              icon={<ButtonArrowIcon />}
              className="transition-opacity hover:opacity-70"
            >
              {data.cta.label}
            </Button>
          ) : null}
        </div>

        {data.title ? (
          <h2 className="text-h2 absolute top-[127px] left-[calc(33.33%+8px)] w-[464px] text-center text-brand-dark-green">
            {data.title}
          </h2>
        ) : null}

        <div className="absolute top-[335px] left-0 flex w-full flex-col gap-3 px-3">
          <div className="grid w-full grid-cols-4 gap-3">
            {data.pillars.map((pillar) => (
              <StackCard
                key={pillar.id}
                label={pillar.title}
                href={pillar.href}
                className={cardClassName}
              />
            ))}
          </div>

          <StackRow
            href={networkingHref}
            className={rowClassName}
            labelClassName="whitespace-pre-line"
          >
            {formatNetworkingTitle(data.networkingTitle)}
          </StackRow>
          <StackRow href={foundationHref} className={rowClassName}>
            {data.foundationTitle}
          </StackRow>
        </div>
      </div>
    </section>
  )
}
