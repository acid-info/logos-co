import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Button, ButtonArrowIcon } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

function MobileGalleryCard({
  src,
  caption,
  date,
}: {
  src: string
  caption: string
  date: string
}) {
  return (
    <div className="w-[calc(100vw-3.25rem)] max-w-[22.25rem] min-w-[18rem] shrink-0 snap-start">
      <div className="aspect-[356/440] overflow-hidden rounded-[4.375rem] bg-brand-dark-green/10">
        <Image
          src={src}
          alt={caption}
          width={356}
          height={440}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="text-eyebrow mt-2.5 flex items-center justify-between px-1 text-brand-dark-green/60">
        <span>{caption}</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

function DesktopGalleryCard({
  src,
  w,
  h,
  caption,
  date,
}: {
  src: string
  w: number
  h: number
  caption: string
  date: string
}) {
  return (
    <div className="shrink-0" style={{ width: `${w}px` }}>
      <div
        className="overflow-hidden rounded-2xl bg-brand-dark-green/10 transition-transform duration-700 hover:scale-[1.02]"
        style={{ height: `${h}px` }}
      >
        <Image
          src={src}
          alt={caption}
          width={w}
          height={h}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="mt-2 flex gap-6 px-1">
        <span className="text-eyebrow text-brand-dark-green/60">{caption}</span>
        <span className="text-eyebrow text-brand-dark-green/60">{date}</span>
      </div>
    </div>
  )
}

export default async function ParallelSocietySection() {
  const t = await getTranslations('home.parallelSociety')
  const headline = t('headline')
  const [before, after] = headline.split('Parallel Society')
  const galleryImages = [
    {
      src: '/images/home/event-1.jpg',
      w: 407,
      h: 502,
      caption: t('gallery1Caption'),
      date: t('gallery1Date'),
    },
    {
      src: '/images/home/event-2.jpg',
      w: 534,
      h: 667,
      caption: t('gallery2Caption'),
      date: t('gallery2Date'),
    },
    {
      src: '/images/home/event-3.jpg',
      w: 466,
      h: 577,
      caption: t('gallery3Caption'),
      date: t('gallery3Date'),
    },
    {
      src: '/images/home/event-4.jpg',
      w: 596,
      h: 402,
      caption: t('gallery4Caption'),
      date: t('gallery4Date'),
    },
  ]

  return (
    <section className="overflow-hidden bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        {/* Headline */}
        <h2 className="text-h1 text-brand-dark-green mb-4 text-center">
          <span className="text-brand-dark-green">
            {before ? '' : ''}Parallel Society{' '}
          </span>
          <span className="text-brand-dark-green/50">
            {after ??
              'is a two-day event in Lisbon where music, art, and technology converge.'}
          </span>
        </h2>

        <div className="mb-10 flex justify-center">
          <Button
            href={ROUTES.press}
            variant="link"
            icon={<ButtonArrowIcon />}
            className="transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Button>
        </div>
      </div>

      <div
        className="overflow-x-auto px-3 pb-2 md:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex w-max snap-x snap-mandatory items-start gap-3 pr-3">
          {galleryImages.map(({ src, caption, date }) => (
            <MobileGalleryCard
              key={src}
              src={src}
              caption={caption}
              date={date}
            />
          ))}
        </div>
      </div>

      {/* Gallery — bleed outside container on desktop */}
      <div
        className="hidden items-start gap-3 px-3 md:flex"
        style={{ marginLeft: '-141px', width: 'calc(100% + 282px)' }}
      >
        {galleryImages.map(({ src, w, h, caption, date }) => (
          <DesktopGalleryCard
            key={src}
            src={src}
            w={w}
            h={h}
            caption={caption}
            date={date}
          />
        ))}
      </div>
    </section>
  )
}
