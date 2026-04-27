import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui'
import { DownloadIcon } from './messaging-shared'

type CardContentProps = {
  title: string
  body: string
  cta: React.ReactNode
  tone: 'dark' | 'light'
}

function CardContent({ title, body, cta, tone }: CardContentProps) {
  const color =
    tone === 'dark' ? 'text-brand-dark-green' : 'text-brand-off-white'

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div
        className={`flex max-w-108 flex-col items-center gap-3 text-center ${color}`}
      >
        <p className="text-subhead-sans">{title}</p>
        <p className="text-mono-s max-w-95">{body}</p>
      </div>
      {cta}
    </div>
  )
}

function BuilderHubButton({ label }: { label: string }) {
  return (
    <Button
      href="#"
      variant="primary"
      className="bg-brand-off-white text-brand-dark-green"
    >
      {label}
    </Button>
  )
}

export default async function MessagingBuilderCta() {
  const t = await getTranslations('pages.messaging.builderCta')

  return (
    <section className="mt-10 hidden bg-brand-off-white md:block">
      <div className="mx-auto flex h-145 max-w-360 items-start gap-3 px-3 py-10">
        <div className="flex h-125 flex-1 items-center justify-center border border-brand-dark-green">
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

        <div className="relative h-125 flex-1 overflow-hidden rounded-[200px]">
          <Image
            src="/images/messaging/builder-hub.webp"
            alt=""
            width={762}
            height={1015}
            sizes="762px"
            className="absolute top-[-441px] left-[-19px] h-[1015px] w-[762px] max-w-none object-cover blur-[20px]"
          />
          <div className="absolute top-[184.5px] left-1/2 flex w-108 -translate-x-1/2 flex-col items-center justify-center gap-3 text-center text-brand-off-white">
            <p className="text-subhead-sans w-full">{t('builderHubTitle')}</p>
            <p className="text-mono-s w-full max-w-95">{t('builderHubBody')}</p>
          </div>
          <div className="absolute top-[275.5px] left-1/2 -translate-x-1/2">
            <BuilderHubButton label={t('builderHubCta')} />
          </div>
        </div>

        <div className="flex h-125 flex-1 items-center justify-center rounded-[60px] bg-gray-01">
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
