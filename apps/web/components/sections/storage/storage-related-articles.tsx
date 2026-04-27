import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button, ButtonArrowIcon } from '@/components/ui'

import { ROUTES } from '@/constants/routes'

interface ArticleCardProps {
  title: string
  mobileTitle?: string
  imageSrc: string
  date: string
  author: string
  href: string
}

function ArticleCard({
  title,
  mobileTitle,
  imageSrc,
  date,
  author,
  href,
}: ArticleCardProps) {
  return (
    <a
      href={href}
      className="group flex w-84.75 shrink-0 cursor-pointer flex-col gap-1.5 md:w-auto"
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
        <p className="text-caption-sans flex-1 font-medium text-brand-dark-green md:text-[14px] md:leading-[1.2]">
          <span className="md:hidden">{mobileTitle ?? title}</span>
          <span className="hidden md:inline">{title}</span>
        </p>
        <div className="shrink-0">
          <p className="text-mono-s text-brand-dark-green">{date}</p>
          <p className="text-mono-s text-brand-dark-green">{author}</p>
        </div>
      </div>
    </a>
  )
}

export default async function StorageRelatedArticles() {
  const t = await getTranslations('pages.storage.relatedArticles')

  const articles = [
    {
      title: t('article1Title'),
      mobileTitle: t('mobileArticleTitle'),
      date: t('article1Date'),
      author: t('article1Author'),
      src: '/images/storage/press-1.webp',
    },
    {
      title: t('article2Title'),
      mobileTitle: t('mobileArticleTitle'),
      date: t('article2Date'),
      author: t('article2Author'),
      src: '/images/storage/press-2.webp',
    },
    {
      title: t('article3Title'),
      mobileTitle: t('mobileArticleTitle'),
      date: t('article3Date'),
      author: t('article3Author'),
      src: '/images/storage/press-3.webp',
    },
    {
      title: t('article4Title'),
      mobileTitle: t('mobileArticleTitle'),
      date: t('article4Date'),
      author: t('article4Author'),
      src: '/images/storage/press-4.webp',
    },
  ]

  return (
    <section className="mt-15 bg-brand-off-white md:mt-25">
      <div className="mx-auto h-220 max-w-360 px-3 py-3">
        <div className="relative h-full overflow-hidden rounded-xl bg-accent-tan">
          <p className="text-mono-s absolute top-6 left-3 w-56.5 text-brand-dark-green">
            {t('label')}
          </p>
          <p className="text-mono-s absolute top-6 left-178.5 hidden w-56.5 text-brand-dark-green md:block">
            {t('eyebrow')}
          </p>
          <div className="absolute top-5.5 right-12 md:right-[87px]">
            <Button
              href={ROUTES.press}
              variant="link"
              icon={<ButtonArrowIcon />}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              {t('cta')}
            </Button>
          </div>
          <h2 className="text-h3-serif absolute top-25.5 left-1/2 w-116 -translate-x-1/2 text-center whitespace-nowrap text-brand-dark-green">
            {t('title')}
          </h2>
          <div className="absolute top-60.25 right-0 left-6 flex gap-3 overflow-x-auto md:right-3 md:left-3 md:grid md:grid-cols-4 md:overflow-visible">
            {articles.map((article) => (
              <ArticleCard
                key={article.src}
                title={article.title}
                mobileTitle={article.mobileTitle}
                imageSrc={article.src}
                date={article.date}
                author={article.author}
                href={ROUTES.press}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
