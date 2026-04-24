'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

type UseCaseCard = {
  title: string
  description: string
  href: string
  imageSrc: string
  imageClassName: string
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      className="size-3.5"
      fill="none"
    >
      {direction === 'left' ? (
        <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  )
}

function ScrollControl({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      className="bg-brand-off-white/10 inline-flex size-10 items-center justify-center rounded-[4px] text-brand-dark-green backdrop-blur-[5px] transition-opacity hover:opacity-70"
    >
      <ArrowIcon direction={direction} />
    </button>
  )
}

function UseCaseCard({
  title,
  description,
  href,
  imageSrc,
  imageClassName,
}: UseCaseCard) {
  const t = useTranslations('pages.technologyStack.useCases')

  return (
    <article className="border-brand-dark-green/50 relative h-[317px] w-[345px] shrink-0 overflow-hidden rounded-xl border bg-brand-off-white">
      <h3 className="text-h4-sans absolute left-4 top-4 w-[249px] text-brand-dark-green">
        {title}
      </h3>

      <div className="absolute left-4 top-[83px]">
        <Button
          href={href}
          variant="link"
          className="transition-opacity hover:opacity-70"
        >
          {t('learnMore')}
        </Button>
      </div>

      <p className="text-mono-s absolute bottom-4 left-4 w-[186px] text-brand-dark-green">
        {description}
      </p>

      <div
        className={`absolute bottom-[11px] right-[10px] overflow-hidden ${imageClassName}`}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
    </article>
  )
}

export default function TechOverviewUseCases() {
  const t = useTranslations('pages.technologyStack.useCases')
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)
  const isDraggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!scrollRef.current) return

    const initialOffset = window.innerWidth >= 768 ? 120 : 333
    scrollRef.current.scrollLeft = initialOffset
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const amount = direction === 'left' ? -357 : 357
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const baseCards: UseCaseCard[] = [
    {
      title: t('card1Title'),
      description: t('card1Desc'),
      href: ROUTES.blockchain,
      imageSrc: '/images/technology-stack/usecase-1.jpg',
      imageClassName: 'h-[120px] w-24',
    },
    {
      title: t('card2Title'),
      description: t('card2Desc'),
      href: ROUTES.storage,
      imageSrc: '/images/technology-stack/usecase-2.jpg',
      imageClassName: 'h-[77px] w-24',
    },
    {
      title: t('card3Title'),
      description: t('card3Desc'),
      href: ROUTES.blockchain,
      imageSrc: '/images/technology-stack/usecase-3.jpg',
      imageClassName: 'h-[119px] w-24',
    },
    {
      title: t('card4Title'),
      description: t('card4Desc'),
      href: ROUTES.circles,
      imageSrc: '/images/technology-stack/usecase-4.jpg',
      imageClassName: 'h-[127px] w-24',
    },
  ]

  const cards = [...baseCards, ...baseCards]

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return

    isDraggingRef.current = true
    setIsDragging(true)
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = scrollRef.current.scrollLeft
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !isDraggingRef.current) return

    const deltaX = event.clientX - dragStartXRef.current
    scrollRef.current.scrollLeft = dragStartScrollLeftRef.current - deltaX
  }

  const stopDragging = () => {
    isDraggingRef.current = false
    setIsDragging(false)
  }

  return (
    <section className="overflow-hidden bg-brand-off-white px-3 pt-10 pb-10 md:pb-16">
      <div className="mx-auto max-w-354">
        <div className="flex items-start justify-between gap-4 md:hidden">
          <div className="relative h-[81px] w-[107px] shrink-0 overflow-hidden">
            <Image
              src="/images/technology-stack/use-cases-top.jpg"
              alt=""
              fill
              sizes="107px"
              className="object-cover"
            />
          </div>

          <p className="text-mono-s w-[178px] text-brand-dark-green">
            {`${t('tagline')} ${t('tagline2')}`}
          </p>
        </div>

        <div className="relative hidden md:block md:h-[309px]">
          <div className="absolute left-0 top-6 h-[81px] w-[107px] overflow-hidden">
            <Image
              src="/images/technology-stack/use-cases-top.jpg"
              alt=""
              fill
              sizes="107px"
              className="object-cover"
            />
          </div>

          <p className="text-mono-s absolute left-[714px] top-6 w-[226px] text-brand-dark-green">
            {t('tagline')}
          </p>
          <p className="text-mono-s absolute left-[1071px] top-6 w-[226px] text-brand-dark-green">
            {t('tagline2')}
          </p>

          <h2 className="text-h2 absolute left-[476px] top-[140px] w-[464px] text-center text-brand-dark-green">
            {t('title')}
          </h2>

          <div className="absolute left-0 top-[269px] flex gap-2.5">
            <ScrollControl direction="left" onClick={() => scroll('left')} />
            <ScrollControl direction="right" onClick={() => scroll('right')} />
          </div>

          <Button
            href={ROUTES.buildersHub}
            variant="link"
            className="absolute left-[714px] top-[272px] transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>

        <h2 className="text-h2 relative left-1/2 mt-16 w-[464px] max-w-none -translate-x-1/2 text-center text-brand-dark-green md:hidden">
          {t('title')}
        </h2>

        <div className="mt-[52px] flex items-center justify-center md:hidden">
          <Button
            href={ROUTES.buildersHub}
            variant="link"
            className="transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`mt-[76px] flex gap-3 overflow-x-auto px-3 pb-4 select-none md:mt-[94px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {cards.map((card, index) => (
          <UseCaseCard key={`${card.title}-${index}`} {...card} />
        ))}
      </div>
    </section>
  )
}
