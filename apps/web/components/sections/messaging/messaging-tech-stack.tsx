import { getTranslations } from 'next-intl/server'
import { twMerge } from 'tailwind-merge'

import { LogosMark } from '@repo/ui'
import { Link } from '@/i18n/navigation'
import { ROUTES } from '@/constants/routes'

type StackTileProps = {
  title: string
  body?: string
  href?: string
  className?: string
  blockchainDetails?: boolean
  showDesktopIcon?: boolean
}

function StackTile({
  title,
  body,
  href,
  className,
  blockchainDetails = false,
  showDesktopIcon = true,
}: StackTileProps) {
  const content = (
    <div
      className={twMerge(
        'relative flex items-center justify-center rounded-3xl border border-brand-dark-green px-3 text-center text-brand-dark-green',
        className
      )}
    >
      <div
        className={twMerge(
          'flex flex-col items-center gap-3 md:flex-row md:gap-2.5',
          blockchainDetails &&
            'absolute top-[50px] left-1/2 w-38 -translate-x-1/2 md:static md:w-auto md:translate-x-0'
        )}
      >
        {showDesktopIcon ? (
          <LogosMark
            size={14}
            className="hidden shrink-0 text-brand-dark-green md:block"
          />
        ) : null}
        <p className="text-subhead-sans">{title}</p>
        {body ? <p className="text-mono-s w-38 md:hidden">{body}</p> : null}
      </div>
      {blockchainDetails ? (
        <div className="absolute right-1.5 bottom-1.5 left-1.5 flex flex-col gap-1.5 md:hidden">
          <div className="flex h-12.5 items-center justify-center rounded-[18px] border border-brand-dark-green/50 px-4">
            <p className="font-mono text-[10px] leading-[1.3] font-medium uppercase">
              Logos Execution Zone (LEZ)
            </p>
          </div>
          <div className="flex h-12.5 items-center justify-center rounded-[18px] border border-brand-dark-green/50 px-4">
            <p className="font-mono text-[10px] leading-[1.3] font-medium uppercase">
              Data Availability and Consensus: Cryptarchia
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )

  if (!href) return content

  return (
    <Link href={href} className="block cursor-pointer">
      {content}
    </Link>
  )
}

export default async function MessagingTechStack({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations({
    locale,
    namespace: 'pages.technologyStack.stack',
  })

  return (
    <section className="mt-15 border-t border-brand-dark-green/10 bg-brand-off-white md:mt-10">
      <div className="mx-auto max-w-360 px-3 pt-25 pb-10">
        <div className="flex flex-col gap-3 md:flex-row md:gap-0">
          <h2 className="text-h4-sans text-brand-dark-green md:w-178.5">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h2>
          <p className="text-mono-s text-brand-dark-green md:w-83.5">
            {t('body')}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-25 md:grid-cols-4">
          <StackTile
            title={t('storage')}
            body="Decentralized file storage and retrieval, using content-addressed (CID-based) data."
            href={ROUTES.storage}
            className="h-64.5 md:h-91.5"
          />
          <StackTile
            title={t('messaging')}
            body="Private, censorship-resistant communication between parties."
            href={ROUTES.messaging}
            className="h-64.5 md:h-91.5"
          />
          <StackTile
            title={t('blockchain')}
            body="Decentralized compute and consensus."
            href={ROUTES.blockchain}
            className="h-64.5 md:h-91.5"
            blockchainDetails
          />
          <StackTile
            title={t('userModules')}
            body="Anyone can build modules that plug into the same IPC infrastructure."
            href={ROUTES.technologyStack}
            className="h-64.5 md:h-91.5"
          />
        </div>

        <div className="mt-3 space-y-3">
          <StackTile
            title={`${t('networkingLine1')} ${t('networkingLine2')}`}
            body="This layer handles how Logos nodes find each other, establish connections, and communicate."
            href={ROUTES.networking}
            className="h-49 md:h-49"
            showDesktopIcon={false}
          />
          <StackTile
            title={t('foundation')}
            body="A microkernel that handles the essential primitives every decentralized application needs."
            href={ROUTES.technologyStack}
            className="h-49 md:h-49"
            showDesktopIcon={false}
          />
        </div>
      </div>
    </section>
  )
}
