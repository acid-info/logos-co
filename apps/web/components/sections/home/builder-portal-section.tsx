import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Button, LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

type ExampleRow = {
  title: string
  desc: string
}

type FeatureRow = {
  id: string
  body: string
}

function BuilderPortalImage({
  title,
  buildLabel,
  buildDesc,
  mobile = false,
}: {
  title: string
  buildLabel: string
  buildDesc: string
  mobile?: boolean
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${
        mobile ? 'aspect-[369/402]' : 'h-156.5'
      }`}
    >
      <Image
        src="/images/home/builder-portal.jpg"
        alt={title}
        fill
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 25.835%, rgba(0,0,0,0) 50%)',
        }}
      />

      <div
        className={`absolute top-3 right-3 left-3 flex items-start justify-between ${
          mobile ? 'gap-4' : ''
        }`}
      >
        <div className="flex w-[7.8125rem] items-center justify-between">
          <LogosMark size={9} className="shrink-0 text-brand-off-white" />
          <span className="text-eyebrow text-brand-off-white">
            {buildLabel}
          </span>
        </div>

        <p
          className={`text-mono-s text-brand-off-white ${
            mobile ? 'w-[10.875rem]' : 'w-83.25'
          }`}
        >
          {buildDesc}
        </p>
      </div>
    </div>
  )
}

function MobileFeatureRow({ id, body }: FeatureRow) {
  return (
    <div className="flex items-start gap-3 text-brand-dark-green">
      <span className="text-mono-s w-18 shrink-0">{id}</span>
      <p className="text-mono-s flex-1">{body}</p>
    </div>
  )
}

function MobileExampleRow({ title, desc }: ExampleRow) {
  return (
    <div className="grid grid-cols-2 gap-3 border-t border-brand-dark-green/50 pt-1.5">
      <span className="text-eyebrow text-brand-dark-green">{title}</span>
      <span className="text-mono-s text-brand-dark-green">{desc}</span>
    </div>
  )
}

export default async function BuilderPortalSection() {
  const t = await getTranslations('home.builderPortal')

  const features: FeatureRow[] = [
    { id: '01', body: t('feature1') },
    { id: '02', body: t('feature2') },
    { id: '03', body: t('feature3') },
  ]

  const examples: ExampleRow[] = [
    { title: t('example1Title'), desc: t('example1Desc') },
    { title: t('example2Title'), desc: t('example2Desc') },
    { title: t('example3Title'), desc: t('example3Desc') },
    { title: t('example4Title'), desc: t('example4Desc') },
  ]

  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white pt-10 pb-25">
      <div className="mx-auto max-w-354 px-3">
        <div className="md:hidden">
          <h2 className="text-h2 max-w-[22.875rem] text-brand-dark-green">
            {t('title')}
          </h2>

          <div className="mt-7.5 flex flex-col gap-7.5">
            <BuilderPortalImage
              title={t('title')}
              buildLabel={t('buildLabel')}
              buildDesc={t('buildDesc')}
              mobile
            />

            <Button
              href={ROUTES.buildersHub}
              className="w-fit transition-opacity hover:opacity-70"
            >
              {t('cta')}
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-7">
            {features.map((feature) => (
              <MobileFeatureRow key={feature.id} {...feature} />
            ))}
          </div>

          <div className="mt-10">
            <p className="text-eyebrow mb-7 text-center text-brand-dark-green">
              Use Cases
            </p>

            <div className="flex flex-col gap-3">
              {examples.map((example) => (
                <MobileExampleRow key={example.title} {...example} />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden gap-3 pt-3 md:flex">
          <div className="relative h-174 w-175.5 shrink-0 text-brand-dark-green">
            <h2 className="absolute top-1.25 w-145.5 font-display text-[56px] leading-none tracking-[-1.68px]">
              {t('title')}
            </h2>

            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="absolute w-86.25 -translate-y-full"
                style={{ top: `${213 + index * 92}px` }}
              >
                <p className="text-mono-s">
                  <span className="inline-block w-30">{feature.id}</span>
                  {feature.body}
                </p>
              </div>
            ))}

            <div className="absolute top-118.5 w-full flex flex-col gap-3">
              {examples.map((example) => (
                <div
                  key={example.title}
                  className="flex items-start gap-3 border-t border-brand-dark-green/50 pt-1.5"
                >
                  <span className="text-eyebrow w-86.25 shrink-0 text-brand-dark-green">
                    {example.title}
                  </span>
                  <span className="text-mono-s flex-1 text-brand-dark-green">
                    {example.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-7.5">
            <BuilderPortalImage
              title={t('title')}
              buildLabel={t('buildLabel')}
              buildDesc={t('buildDesc')}
            />

            <Button
              href={ROUTES.buildersHub}
              className="transition-opacity hover:opacity-70"
            >
              {t('cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
