import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button, ButtonArrowIcon } from '@/components/ui'

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
      <div className="mx-auto max-w-360 px-3 py-3">
        {/* Desktop: Figma-exact absolute layout (tan bg w-1416, h-856) */}
        <div className="relative hidden h-214 overflow-hidden rounded-xl bg-accent-tan md:block">
          <p className="text-mono-s absolute top-6 left-3 w-56.5 text-brand-dark-green">
            {t('label')}
          </p>
          <p className="text-mono-s absolute top-6 left-178.5 w-56.5 text-brand-dark-green">
            {t('eyebrow')}
          </p>
          <div className="absolute top-5.5 left-297.5">
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
          <div className="absolute top-60.25 right-3 left-3 grid grid-cols-4 gap-3">
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

        {/* Mobile: simple stacked flow */}
        <div className="overflow-hidden rounded-xl bg-accent-tan px-3 pt-6 pb-10 md:hidden">
          <div className="flex items-start justify-between">
            <p className="text-mono-s w-56.5 max-w-[50%] text-brand-dark-green">
              {t('label')}
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
          <div className="mt-17.5 flex gap-3 overflow-x-auto">
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
