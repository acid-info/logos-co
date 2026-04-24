import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button, ButtonArrowIcon } from '@repo/ui'

import { ROUTES } from '@/constants/routes'

interface ArticleCardProps {
  title: string
  imageSrc: string
  date: string
  author: string
  href: string
}

function ArticleCard({
  title,
  imageSrc,
  date,
  author,
  href,
}: ArticleCardProps) {
  return (
    <a
      href={href}
      className="group flex w-[339px] shrink-0 cursor-pointer flex-col gap-1.5 md:w-auto"
    >
      <div className="aspect-339/431 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={339}
          height={431}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline gap-10">
        <p className="text-body-sans flex-1 font-medium text-brand-dark-green">
          {title}
        </p>
        <div className="shrink-0">
          <p className="text-mono-s text-brand-dark-green">{date}</p>
          <p className="text-mono-s text-brand-dark-green">{author}</p>
        </div>
      </div>
    </a>
  )
}

export default async function BlockchainRelatedArticles() {
  const t = await getTranslations('pages.blockchain.relatedArticles')

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
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-354 px-3 py-3">
        <div className="relative overflow-hidden rounded-xl bg-accent-tan px-3 pt-6 pb-10 md:pb-14">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <p className="text-mono-s w-[226px] max-w-[50%] text-brand-dark-green">
              {t('label')}
            </p>
            <p className="text-mono-s hidden w-[226px] text-center text-brand-dark-green md:block">
              {t('eyebrow')}
            </p>
            <div className="flex w-[226px] max-w-[50%] justify-end">
              <Button
                href={ROUTES.press}
                variant="link"
                icon={<ButtonArrowIcon />}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                {t('cta')}
              </Button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-h3-serif mt-[65px] whitespace-nowrap text-center text-brand-dark-green">
            {t('title')}
          </h2>

          {/* Cards */}
          <div className="mt-[70px] flex gap-3 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
            {articles.map((a) => (
              <ArticleCard
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
