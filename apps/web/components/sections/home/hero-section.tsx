'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

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
      <motion.div
        className="relative flex h-full flex-col"
        style={{ opacity: contentOpacity }}
      >
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
          <p className="text-mono-s text-brand-off-white w-56.5">
            {t('tagline')}
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              href={ROUTES.circles}
              className="bg-brand-off-white text-brand-dark-green transition-all hover:bg-transparent hover:text-brand-off-white"
            >
              {t('joinMovement')}
            </Button>
            <Button
              href={ROUTES.about}
              variant="secondary"
              className="rounded-xl border-brand-off-white/50 text-brand-off-white backdrop-blur-sm transition-all hover:bg-brand-off-white hover:text-brand-dark-green"
            >
              {t('learnMore')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
