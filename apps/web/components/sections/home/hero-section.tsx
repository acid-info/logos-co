'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
      <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function PrimaryBtn({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-brand-off-white px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green backdrop-blur-sm transition-all hover:bg-transparent hover:text-brand-off-white"
    >
      {children}
      <ArrowRight />
    </a>
  )
}

function OutlineBtn({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 border border-brand-off-white/50 px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-off-white backdrop-blur-sm transition-all hover:bg-brand-off-white hover:text-brand-dark-green"
    >
      {children}
      <ArrowRight />
    </a>
  )
}

export default function HeroSection() {
  const t = useTranslations('home.atf')
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] h-screen overflow-hidden bg-brand-dark-green"
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        {/* Video background with image fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/home/hero-bg.jpg"
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/videos/home/logos-bg-vid.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Content */}
      <motion.div className="relative flex h-full flex-col" style={{ opacity: contentOpacity }}>
        {/* Headline */}
        <motion.h1
          className="text-hero text-brand-off-white mt-41.25 w-full text-center leading-[0.95]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          {t('headline')}
        </motion.h1>

        {/* Tagline + CTAs */}
        <motion.div
          className="ml-15 mt-21 flex flex-col gap-6 md:ml-[calc(50%+6px)] md:mt-17.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
        >
          <p className="text-mono-s text-brand-off-white w-56.5">{t('tagline')}</p>
          <div className="flex items-center gap-1.5">
            <PrimaryBtn href={ROUTES.circles}>{t('joinMovement')}</PrimaryBtn>
            <OutlineBtn href={ROUTES.about}>{t('learnMore')}</OutlineBtn>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
