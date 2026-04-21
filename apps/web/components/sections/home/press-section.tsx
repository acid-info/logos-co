import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'

function PrimaryBtn({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-brand-dark-green px-3 py-2 font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-off-white transition-opacity hover:opacity-70"
    >
      {children}
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
    <a href={href} className="group flex shrink-0 cursor-pointer flex-col">
      <div className="aspect-339/431 w-full overflow-hidden bg-brand-dark-green/10">
        <Image
          src={imageSrc}
          alt={title}
          width={339}
          height={431}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex gap-3">
        <p className="font-sans flex-1 text-sm font-medium leading-[1.2] text-brand-dark-green">
          {title}
        </p>
        <div className="shrink-0 text-right">
          <p className="text-eyebrow text-brand-dark-green/50">{date}</p>
          <p className="text-eyebrow text-brand-dark-green/50">{author}</p>
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
        {/* Header */}
        <div className="mb-6">
          <div className="mb-6 flex items-start justify-between">
            <p className="text-eyebrow text-brand-dark-green/50">{t('eyebrow')}</p>
            <PrimaryBtn href={ROUTES.press}>{t('cta')}</PrimaryBtn>
          </div>
          <h2 className="text-h1 text-brand-dark-green text-center">{t('title')}</h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
    </section>
  )
}
