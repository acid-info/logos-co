import { getTranslations } from 'next-intl/server'

import { StackCard, StackRow } from './stack-item'
import { ROUTES } from '@/constants/routes'

const cardClassName =
  'border-brand-dark-green/50 hover:border-brand-dark-green h-64.5 md:h-91.5'
const rowClassName =
  'border-brand-dark-green/50 hover:border-brand-dark-green h-35 md:h-49'

export default async function TechOverviewStack() {
  const t = await getTranslations('pages.technologyStack.stack')

  return (
    <section className="bg-brand-off-white px-3 pb-10 md:pb-10">
      <div className="mx-auto max-w-354">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
