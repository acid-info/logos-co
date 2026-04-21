import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'

function TextLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green transition-opacity hover:opacity-70"
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 10 10" className="size-2.5 shrink-0" fill="none">
        <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  )
}

const GALLERY_IMAGES = [
  { src: '/images/home/event-1.jpg', w: 407, h: 502, caption: 'Lorem ipsum', date: '02.14.26' },
  { src: '/images/home/event-2.jpg', w: 534, h: 667, caption: 'Lorem ipsum', date: '02.14.26' },
  { src: '/images/home/event-3.jpg', w: 466, h: 577, caption: 'Lorem ipsum', date: '02.14.26' },
  { src: '/images/home/event-4.jpg', w: 596, h: 402, caption: 'Lorem ipsum', date: '02.14.26' },
]

export default async function ParallelSocietySection() {
  const t = await getTranslations('home.parallelSociety')
  const headline = t('headline')
  const [before, after] = headline.split('Parallel Society')

  return (
    <section className="overflow-hidden bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        {/* Headline */}
        <h2 className="text-h1 text-brand-dark-green mb-4 text-center">
          <span className="text-brand-dark-green">{before ? '' : ''}Parallel Society </span>
          <span className="text-brand-dark-green/50">
            {after ?? 'is a two-day event in Lisbon where music, art, and technology converge.'}
          </span>
        </h2>

        <div className="mb-10 flex justify-center">
          <TextLink href={ROUTES.press}>{t('cta')}</TextLink>
        </div>
      </div>

      {/* Gallery — bleed outside container on desktop */}
      <div
        className="flex items-start gap-3 px-3"
        style={{ marginLeft: '-141px', width: 'calc(100% + 282px)' }}
      >
        {GALLERY_IMAGES.map(({ src, w, h, caption, date }) => (
          <div key={src} className="shrink-0" style={{ width: `${w}px` }}>
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
        ))}
      </div>
    </section>
  )
}
