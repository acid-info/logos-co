import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button, ButtonArrowIcon } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

type ArticleCardProps = {
  title: string
  imageSrc: string
  date: string
  author: string
}

function ArticleCard({ title, imageSrc, date, author }: ArticleCardProps) {
  return (
    <a
      href={ROUTES.press}
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
        <p className="font-sans text-[12px] leading-[1.2] font-medium text-brand-dark-green md:text-[14px]">
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

export default async function MessagingRelatedArticles() {
  const t = await getTranslations('pages.messaging.relatedArticles')

  const articles = [
    {
      title: t('article1Title'),
      date: t('article1Date'),
      author: t('article1Author'),
      imageSrc: '/images/messaging/press-1.webp',
    },
    {
      title: t('article2Title'),
      date: t('article2Date'),
      author: t('article2Author'),
      imageSrc: '/images/messaging/press-2.webp',
    },
    {
      title: t('article3Title'),
      date: t('article3Date'),
      author: t('article3Author'),
      imageSrc: '/images/messaging/press-3.webp',
    },
    {
      title: t('article4Title'),
      date: t('article4Date'),
      author: t('article4Author'),
      imageSrc: '/images/messaging/press-4.webp',
    },
  ]

  return (
    <section className="bg-brand-off-white md:mt-0">
      <div className="mx-auto max-w-360 px-3 py-3 md:pb-0">
        <div className="relative h-220 overflow-hidden rounded-xl bg-accent-tan px-3 pt-6">
          <div className="flex items-start justify-between">
            <p className="text-mono-s w-56.5 max-w-[50%] text-brand-dark-green">
              {t('label')}
            </p>
            <p className="text-mono-s hidden w-56.5 text-center text-brand-dark-green md:block">
              {t('eyebrow')}
            </p>
            <div className="flex w-56.5 max-w-[50%] justify-end">
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

          <h2 className="text-h3-serif mt-16.25 text-center whitespace-nowrap text-brand-dark-green">
            {t('title')}
          </h2>

          <div className="mt-27.75 flex gap-3 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
            {articles.map((article) => (
              <ArticleCard key={article.imageSrc} {...article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
