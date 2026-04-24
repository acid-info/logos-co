import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Button, ButtonArrowIcon } from '@/components/ui'

import {
  StackCard,
  StackRow,
} from '@/components/sections/technology-stack/stack-item'
import { ROUTES } from '@/constants/routes'

const cardClassName =
  'border-brand-dark-green/10 hover:border-brand-dark-green/30 h-91.5 p-5'
const rowClassName =
  'border-brand-dark-green/10 hover:border-brand-dark-green/30 h-49 overflow-hidden'

export default async function TechStackSection() {
  const t = await getTranslations('home.techStack')

  return (
    <section id="tech-stack" className="bg-brand-off-white py-20 md:py-32">
      <div className="mx-auto max-w-354 px-3">
        {/* Header row */}
        <div className="mb-6 flex items-start justify-between">
          <div className="relative h-18.75 w-26.75 overflow-hidden rounded-lg">
            <Image
              src="/images/home/build-bg.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <p className="text-mono-s max-w-56.5 text-center text-brand-dark-green">
            {t('tagline')}
          </p>
          <Button
            href={ROUTES.technologyStack}
            variant="link"
            icon={<ButtonArrowIcon />}
            className="transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>

        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-h1 text-brand-dark-green">{t('title')}</h2>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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

        {/* Full-width rows */}
        <div className="mt-3 space-y-3">
          <StackRow href={ROUTES.networking} className={rowClassName}>
            {t('networkingStack')}
          </StackRow>
          <StackRow href={ROUTES.technologyStack} className={rowClassName}>
            {t('foundation')}
          </StackRow>
        </div>
      </div>
    </section>
  )
}
