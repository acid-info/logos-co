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

interface PressCardProps {
  title: string
  imageSrc: string
  date: string
  author: string
  href: string
}

function PressCard({ title, imageSrc, date, author, href }: PressCardProps) {
  return (
    <a href={href} className="group flex cursor-pointer flex-col gap-1.5">
      <div className="aspect-339/431 w-full overflow-hidden bg-brand-dark-green/10">
        <Image
          src={imageSrc}
          alt={title}
          width={339}
          height={431}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex gap-10 items-baseline">
        <p className="flex-1 font-sans text-sm font-medium leading-[1.2] text-brand-dark-green">
          {title}
        </p>
        <div className="shrink-0">
          <p className="text-eyebrow text-brand-dark-green">{date}</p>
          <p className="text-eyebrow text-brand-dark-green">{author}</p>
        </div>
      </div>
    </a>
  )
}

export default async function PressSection() {
  const t = await getTranslations('home.press')

  const articles = [
    { title: t('article1Title'), date: t('article1Date'), author: t('article1Author'), src: '/images/home/press-1.jpg' },
    { title: t('article2Title'), date: t('article2Date'), author: t('article2Author'), src: '/images/home/press-2.jpg' },
    { title: t('article3Title'), date: t('article3Date'), author: t('article3Author'), src: '/images/home/press-3.jpg' },
    { title: t('article4Title'), date: t('article4Date'), author: t('article4Author'), src: '/images/home/press-4.jpg' },
  ]

  return (
    <section id="press" className="bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">

        {/* Single tan card — contains header + cards (ATF is h-856px in Figma, cards sit on top of it) */}
        <div className="overflow-hidden rounded-xl bg-accent-tan px-3 pt-6 pb-40">

          {/* Top row: 3 columns */}
          <div className="flex items-start justify-between">
            <p className="text-mono-s text-brand-dark-green w-56.5">{t('label')}</p>
            <p className="text-mono-s text-brand-dark-green text-center">{t('eyebrow')}</p>
            <div className="w-56.5 flex justify-end">
              <TextLink href={ROUTES.press}>{t('cta')}</TextLink>
            </div>
          </div>

          {/* "Press" title — 65px below the header row to land at top-[102px] in Figma */}
          <h2
            className="text-h1 text-brand-dark-green text-center"
            style={{ marginTop: '65px' }}
          >
            {t('title')}
          </h2>

          {/* Cards grid — starts at top-[241px] from container (229px from ATF top) */}
          <div className="mt-17.75 grid grid-cols-2 gap-3 md:grid-cols-4">
            {articles.map((a) => (
              <PressCard
                key={a.title}
                title={a.title}
                imageSrc={a.src}
                date={a.date}
                author={a.author}
                href={ROUTES.press}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
