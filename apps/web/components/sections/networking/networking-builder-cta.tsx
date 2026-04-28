import Image from 'next/image'

import type { CardGridSection } from '@repo/content/schemas'

import { Button } from '@/components/ui'

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15 15"
      className="size-3.75 shrink-0"
      fill="none"
    >
      <path
        d="M7.5 2v8m0 0L4.5 7m3 3L10.5 7M3 12.5h9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

type CardContentProps = {
  title: string
  body: string
  cta: React.ReactNode
  color: 'dark' | 'light'
}

function CardContent({ title, body, cta, color }: CardContentProps) {
  const textColor =
    color === 'dark' ? 'text-brand-dark-green' : 'text-brand-off-white'
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div
        className={`flex w-full max-w-108 flex-col items-center gap-3 px-4 text-center ${textColor}`}
      >
        <p className="text-subhead-sans w-full">{title}</p>
        <p className="text-mono-s w-full max-w-95">{body}</p>
      </div>
      {cta}
    </div>
  )
}

type Props = {
  data: CardGridSection
}

/**
 * Same positional 3-card pattern as the blockchain / storage builder CTAs:
 *   cards[0] → Docs       (bordered, square, off-white)
 *   cards[1] → Builder Hub (rounded pill, blurred image bg)
 *   cards[2] → Logos App   (gray-01, rounded, download icon)
 */
export default function NetworkingBuilderCta({ data }: Props) {
  const [docsCard, builderHubCard, logosAppCard] = data.cards

  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto flex max-w-360 flex-col gap-3 px-3 py-10 md:flex-row md:items-start">
        {docsCard ? (
          <div className="flex h-75 w-full flex-1 flex-col items-center justify-center overflow-hidden border border-brand-dark-green p-4 md:h-125">
            <CardContent
              title={docsCard.title}
              body={docsCard.description ?? ''}
              color="dark"
              cta={
                docsCard.cta ? (
                  <Button href={docsCard.cta.href} variant="primary">
                    {docsCard.cta.label}
                  </Button>
                ) : null
              }
            />
          </div>
        ) : null}

        {builderHubCard ? (
          <div className="relative h-75 w-full flex-1 overflow-hidden rounded-[200px] md:h-125">
            {builderHubCard.image ? (
              <Image
                src={builderHubCard.image.src}
                alt={builderHubCard.image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="scale-110 object-cover blur-[20px]"
              />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center">
              <CardContent
                title={builderHubCard.title}
                body={builderHubCard.description ?? ''}
                color="light"
                cta={
                  builderHubCard.cta ? (
                    <Button
                      href={builderHubCard.cta.href}
                      variant="primary"
                      className="bg-brand-off-white text-brand-dark-green"
                    >
                      {builderHubCard.cta.label}
                    </Button>
                  ) : null
                }
              />
            </div>
          </div>
        ) : null}

        {logosAppCard ? (
          <div className="flex h-75 w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[60px] bg-gray-01 p-4 md:h-125">
            <CardContent
              title={logosAppCard.title}
              body={logosAppCard.description ?? ''}
              color="dark"
              cta={
                logosAppCard.cta ? (
                  <Button
                    href={logosAppCard.cta.href}
                    variant="primary"
                    icon={<DownloadIcon />}
                  >
                    {logosAppCard.cta.label}
                  </Button>
                ) : null
              }
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
