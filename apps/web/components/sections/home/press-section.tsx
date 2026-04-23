import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Button, ButtonArrowIcon } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

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
        <p className="text-body-sans flex-1 font-medium text-brand-dark-green">
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
    {
      title: t('article1Title'),
      date: t('article1Date'),
      author: t('article1Author'),
      src: '/images/home/press-1.jpg',
    },
    {
      title: t('article2Title'),
      date: t('article2Date'),
      author: t('article2Author'),
      src: '/images/home/press-2.jpg',
    },
    {
      title: t('article3Title'),
      date: t('article3Date'),
      author: t('article3Author'),
      src: '/images/home/press-3.jpg',
    },
    {
      title: t('article4Title'),
      date: t('article4Date'),
      author: t('article4Author'),
      src: '/images/home/press-4.jpg',
    },
  ]

  return (
    <section id="press" className="bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        {/* Single tan card — contains header + cards (ATF is h-856px in Figma, cards sit on top of it) */}
        <div className="overflow-hidden rounded-xl bg-accent-tan px-3 pt-6 pb-40">
          {/* Top row: 3 columns */}
          <div className="flex items-start justify-between">
            <p className="text-mono-s text-brand-dark-green w-56.5">
              {t('label')}
            </p>
            <p className="text-mono-s text-brand-dark-green text-center">
              {t('eyebrow')}
            </p>
            <div className="w-56.5 flex justify-end">
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

          {/* "Press" title — 65px below the header row to land at top-[102px] in Figma */}
          <h2 className="text-h1 text-brand-dark-green mt-[65px] text-center">
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
