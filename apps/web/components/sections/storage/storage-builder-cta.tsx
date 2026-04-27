import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

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
  tone: 'dark' | 'light'
}

function CardContent({ title, body, cta, tone }: CardContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
      <div
        className={`flex w-full max-w-108 flex-col items-center gap-3 px-4 text-center ${
          tone === 'dark' ? 'text-brand-dark-green' : 'text-brand-off-white'
        }`}
      >
        <p className="text-subhead-sans w-full">{title}</p>
        <p className="text-mono-s w-full max-w-95">{body}</p>
      </div>
      {cta}
    </div>
  )
}

export default async function StorageBuilderCta() {
  const t = await getTranslations('pages.storage.builderCta')

  return (
    <section className="mt-15 bg-brand-off-white md:mt-25">
      <div className="mx-auto flex max-w-360 flex-col gap-3 px-3 py-10 md:flex-row md:items-start">
        <div className="flex h-75 w-full flex-col items-center justify-center overflow-hidden border border-brand-dark-green p-4 md:h-125 md:flex-1">
          <CardContent
            title={t('docsTitle')}
            body={t('docsBody')}
            tone="dark"
            cta={
              <Button href="#" variant="primary">
                {t('docsCta')}
              </Button>
            }
          />
        </div>

        <div className="relative h-75 w-full overflow-hidden rounded-[200px] bg-brand-dark-green md:h-125 md:flex-1">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Image
              src="/images/storage/builder-hub.webp"
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
              tone="light"
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

        <div className="flex h-75 w-full flex-col items-center justify-center overflow-hidden rounded-[60px] bg-gray-01 p-4 md:h-125 md:flex-1">
          <CardContent
            title={t('logosAppTitle')}
            body={t('logosAppBody')}
            tone="dark"
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
