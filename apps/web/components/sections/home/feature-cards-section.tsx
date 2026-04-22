'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { LogosMark } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
      <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function CardCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 self-start rounded-xl bg-brand-off-white px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green backdrop-blur-sm transition-all hover:bg-transparent hover:text-brand-off-white"
    >
      {children}
      <ArrowRight />
    </a>
  )
}

interface TableRow {
  title: string
  desc: string
}

interface FeatureCardProps {
  eyebrow: string
  description: string
  cta: string
  ctaHref: string
  tableIndex: string
  tableName: string
  tableLabel: string
  rows: TableRow[]
  bgImage: string
  cardTopOffset: number
  hasBackdropBlur?: boolean
  priority?: boolean
}

function FeatureCard({
  eyebrow,
  description,
  cta,
  ctaHref,
  tableIndex,
  tableName,
  tableLabel,
  rows,
  bgImage,
  cardTopOffset,
  hasBackdropBlur,
  priority = false,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.1 })

  return (
    <div ref={cardRef} className="sticky top-0 h-180.75" style={{ zIndex: 1 }}>
      <motion.div
        className="absolute left-0 h-93.25 w-full overflow-hidden rounded-3xl"
        style={{ top: cardTopOffset }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image src={bgImage} alt="" fill className="scale-110 object-cover" priority={priority} />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full w-full">
          {/* Left — eyebrow + description + CTA */}
          <div className="flex w-129.5 shrink-0 flex-col justify-between p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <LogosMark size={26} className="shrink-0 text-brand-off-white" />
                <span className="text-h3-serif text-brand-off-white">{eyebrow}</span>
              </div>
              <p className="w-80 font-sans text-sm font-medium leading-[1.2] text-brand-off-white">
                {description}
              </p>
            </div>
            <CardCTA href={ctaHref}>{cta}</CardCTA>
          </div>

          {/* Right — table (desktop only) */}
          <div
            className={`absolute top-3 left-178.5 hidden h-87.25 w-172.5 overflow-hidden rounded-xl md:block ${hasBackdropBlur ? 'backdrop-blur-[10px]' : ''}`}
          >
            <div className="flex gap-3 px-3 pt-3 text-eyebrow text-brand-off-white">
              <span className="w-23.75">{tableIndex}</span>
              {tableName && <span className="w-56.5">{tableName}</span>}
              <span>{tableLabel}</span>
            </div>
            <div className="mt-auto flex flex-col gap-3 px-3 pt-4">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="flex gap-3 border-t border-brand-off-white/50 pt-1.5"
                >
                  {row.title && (
                    <span className="text-eyebrow w-83.25 shrink-0 text-brand-off-white">
                      {row.title}
                    </span>
                  )}
                  <span className="text-mono-s text-brand-off-white">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function FeatureCardsSection() {
  const t = useTranslations('home')

  return (
    <section className="-mt-80 relative" style={{ zIndex: 5 }}>
      <div className="pt-27">
        <div className="rounded-tl-[36px] rounded-tr-[36px] bg-brand-off-white pt-3">
          <div className="relative mx-auto max-w-354 px-3">
            <FeatureCard
              eyebrow={t('build.eyebrow')}
              description={t('build.description')}
              cta={t('build.cta')}
              ctaHref={ROUTES.buildersHub}
              tableIndex={t('build.number')}
              tableName={t('build.eyebrow').toLowerCase()}
              tableLabel={t('build.examples')}
              rows={[
                { title: t('build.row1Title'), desc: t('build.row1Desc') },
                { title: t('build.row2Title'), desc: t('build.row2Desc') },
                { title: t('build.row3Title'), desc: t('build.row3Desc') },
                { title: t('build.row4Title'), desc: t('build.row4Desc') },
              ]}
              bgImage="/images/home/build-bg.jpg"
              cardTopOffset={50}
              priority
            />

            <FeatureCard
              eyebrow={t('node.eyebrow')}
              description={t('node.description')}
              cta={t('node.cta')}
              ctaHref={ROUTES.nodeProgram}
              tableIndex={t('node.number')}
              tableName={t('node.eyebrow').toLowerCase()}
              tableLabel={t('node.examples')}
              rows={[]}
              bgImage="/images/home/node-card-bg.png"
              cardTopOffset={200}
            />

            <FeatureCard
              eyebrow={t('circles.eyebrow')}
              description={t('circles.description')}
              cta={t('circles.cta')}
              ctaHref={ROUTES.circles}
              tableIndex={t('circles.number')}
              tableName=""
              tableLabel={t('circles.winnableIssues')}
              rows={[]}
              bgImage="/images/home/circles-card-bg.png"
              cardTopOffset={350}
              hasBackdropBlur
            />
          </div>
        </div>
      </div>
    </section>
  )
}
