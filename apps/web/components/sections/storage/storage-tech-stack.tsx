import { getTranslations } from 'next-intl/server'

import { LogosMark } from '@repo/ui'
import { Link } from '@/i18n/navigation'
import { ROUTES } from '@/constants/routes'

type CardProps = {
  title: string
  body?: string
  href: string
  wide?: boolean
  zones?: string[]
}

function StackCard({ title, body, href, wide, zones }: CardProps) {
  return (
    <Link
      href={href}
      className={`flex min-w-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-brand-dark-green text-center text-brand-dark-green transition-opacity hover:opacity-70 ${
        wide ? 'h-49 w-full' : 'h-64.5 w-[178px] md:h-91.5 md:w-auto'
      }`}
    >
      <span className="text-subhead-sans hidden items-center gap-2 md:flex">
        {!wide && <LogosMark size={14} className="shrink-0" />}
        {title}
      </span>

      <span className="flex w-full flex-col items-center gap-3 px-3 md:hidden">
        <span className="text-subhead-sans w-full max-w-full text-center">
          {title}
        </span>
        {body && (
          <span className="text-mono-s w-full max-w-full text-center break-words">
            {body}
          </span>
        )}
        {zones && (
          <span className="flex w-full flex-col gap-1.5 px-0.5">
            {zones.map((zone) => (
              <span
                key={zone}
                className="flex h-12.5 items-center justify-center rounded-[18px] border border-brand-dark-green/50 px-3 text-center font-mono text-[9px] leading-[1.15] font-medium break-words uppercase"
              >
                {zone}
              </span>
            ))}
          </span>
        )}
      </span>
    </Link>
  )
}

export default async function StorageTechStack() {
  const t = await getTranslations('pages.technologyStack.stack')
  const storageT = await getTranslations('pages.storage.techStack')

  return (
    <section className="mt-15 border-t border-brand-dark-green/10 bg-brand-off-white md:mt-25">
      <div className="mx-auto max-w-360 px-3 pt-25">
        <div className="flex flex-col gap-3 text-brand-dark-green md:flex-row md:gap-0">
          <h2 className="text-h4-sans md:w-178.5">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h2>
          <p className="text-mono-s md:w-83.5">{t('body')}</p>
        </div>

        <div
          className="mt-15 grid w-full max-w-[369px] gap-3 [--storage-stack-columns:2] md:mt-25 md:max-w-none md:[--storage-stack-columns:4]"
          style={{
            gridTemplateColumns:
              'repeat(var(--storage-stack-columns), minmax(0, 1fr))',
          }}
        >
          <StackCard
            title={t('storage')}
            body={storageT('storageBody')}
            href={ROUTES.storage}
          />
          <StackCard
            title={t('messaging')}
            body={storageT('messagingBody')}
            href={ROUTES.messaging}
          />
          <StackCard
            title={t('blockchain')}
            body={storageT('blockchainBody')}
            href={ROUTES.blockchain}
            zones={[storageT('lez'), storageT('cryptarchia')]}
          />
          <StackCard
            title={t('userModules')}
            body={storageT('userModulesBody')}
            href={ROUTES.technologyStack}
          />
        </div>

        <div className="mt-3 flex flex-col gap-3 pb-9.5 md:pb-0">
          <StackCard
            title={`${t('networkingLine1')} ${t('networkingLine2')}`}
            body={storageT('networkingBody')}
            href={ROUTES.networking}
            wide
          />
          <StackCard
            title={t('foundation')}
            body={storageT('foundationBody')}
            href={ROUTES.technologyStack}
            wide
          />
        </div>
      </div>
    </section>
  )
}
