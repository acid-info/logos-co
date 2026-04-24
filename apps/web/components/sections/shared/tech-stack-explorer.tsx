import { getTranslations } from 'next-intl/server'

import {
  StackCard,
  StackRow,
} from '@/components/sections/technology-stack/stack-item'
import { ROUTES } from '@/constants/routes'

const cardClassName =
  'border-brand-dark-green/50 hover:border-brand-dark-green h-64.5 md:h-91.5'
const rowClassName =
  'border-brand-dark-green/50 hover:border-brand-dark-green h-35 md:h-49'

export default async function TechStackExplorer() {
  const t = await getTranslations('pages.technologyStack.stack')

  return (
    <section className="border-brand-dark-green/10 bg-brand-off-white border-t">
      <div className="mx-auto max-w-354 px-3 pt-16 pb-10 md:pt-25 md:pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-0">
          <p className="text-h4-sans text-brand-dark-green md:w-178.5">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </p>
          <p className="text-mono-s text-brand-dark-green md:w-83.5">
            {t('body')}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-25 md:grid-cols-4">
          <StackCard
            label={t('storage')}
            href={ROUTES.storage}
            className={cardClassName}
          />
          <StackCard
            label={t('messaging')}
            href={ROUTES.messaging}
            className={cardClassName}
          />
          <StackCard
            label={t('blockchain')}
            href={ROUTES.blockchain}
            className={cardClassName}
          />
          <StackCard
            label={t('userModules')}
            href={ROUTES.technologyStack}
            className={cardClassName}
          />
        </div>

        <div className="mt-3 space-y-3">
          <StackRow href={ROUTES.networking} className={rowClassName}>
            <span className="block">{t('networkingLine1')}</span>
            <span className="block">{t('networkingLine2')}</span>
          </StackRow>
          <StackRow href={ROUTES.technologyStack} className={rowClassName}>
            {t('foundation')}
          </StackRow>
        </div>
      </div>
    </section>
  )
}
