import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button } from '@repo/ui'

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15 15"
      className="size-[15px] shrink-0"
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
    <div className="flex flex-col items-center justify-center gap-6">
      <div
        className={`flex w-full max-w-[432px] flex-col items-center gap-3 px-4 text-center ${textColor}`}
      >
        <p className="text-subhead-sans w-full">{title}</p>
        <p className="text-mono-s max-w-[380px] w-full">{body}</p>
      </div>
      {cta}
    </div>
  )
}

export default async function BlockchainBuilderCta() {
  const t = await getTranslations('pages.blockchain.builderCta')

  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto flex max-w-354 flex-col gap-3 px-3 py-10 md:flex-row md:items-start">
        {/* Card 1: Docs — bordered, square corners, off-white bg */}
        <div className="flex h-[300px] w-full md:flex-1 flex-col items-center justify-center overflow-hidden border border-brand-dark-green p-4 md:h-[500px]">
          <CardContent
            title={t('docsTitle')}
            body={t('docsBody')}
            color="dark"
            cta={
              <Button href="#" variant="primary">
                {t('docsCta')}
              </Button>
            }
          />
        </div>

        {/* Card 2: Logos Builder Hub — rounded pill, blurred dark image bg */}
        <div className="relative h-[300px] w-full md:flex-1 overflow-hidden rounded-[200px] bg-brand-dark-green md:h-[500px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Image
              src="/images/blockchain/builder-hub.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="scale-125 object-cover blur-2xl"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CardContent
              title={t('builderHubTitle')}
              body={t('builderHubBody')}
              color="light"
              cta={
                <Button
                  href="#"
                  variant="primary"
                  className="bg-brand-off-white text-brand-dark-green"
                >
                  {t('builderHubCta')}
                </Button>
              }
            />
          </div>
        </div>

        {/* Card 3: Logos App — gray-01 bg, rounded */}
        <div className="flex h-[300px] w-full md:flex-1 flex-col items-center justify-center overflow-hidden rounded-[60px] bg-gray-01 p-4 md:h-[500px]">
          <CardContent
            title={t('logosAppTitle')}
            body={t('logosAppBody')}
            color="dark"
            cta={
              <Button href="#" variant="primary" icon={<DownloadIcon />}>
                {t('logosAppCta')}
              </Button>
            }
          />
        </div>
      </div>
    </section>
  )
}
