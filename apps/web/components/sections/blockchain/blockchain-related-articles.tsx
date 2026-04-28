import Image from 'next/image'

import type { PressArticle } from '@repo/content/loaders'
import type { RelatedArticlesSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'

const formatPressDateUTC = (iso: string): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso))
  const month = parts.find((p) => p.type === 'month')?.value ?? ''
  const day = parts.find((p) => p.type === 'day')?.value ?? ''
  const year = parts.find((p) => p.type === 'year')?.value ?? ''
  return `${month}.${day}.${year}`
}

interface ArticleCardProps {
  title: string
  imageSrc: string
  imageAlt: string
  date: string
  author: string
  href: string
}

function ArticleCard({
  title,
  imageSrc,
  imageAlt,
  date,
  author,
  href,
}: ArticleCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-84.75 shrink-0 cursor-pointer flex-col gap-1.5 md:w-auto"
    >
      <div className="aspect-339/431 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
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
          {author ? (
            <p className="text-mono-s text-brand-dark-green">{author}</p>
          ) : null}
        </div>
      </div>
    </a>
  )
}

type Props = {
  data: RelatedArticlesSection
  articles: PressArticle[]
}

export default function BlockchainRelatedArticles({ data, articles }: Props) {
  const cards = articles.map((article) => ({
    title: article.title,
    imageSrc: article.image.src,
    imageAlt: article.image.alt || article.title,
    date: article.displayDate ?? formatPressDateUTC(article.publishedAt),
    author: article.author?.name ?? '',
    href: article.externalUrl,
  }))

  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3 py-3">
        {/* Desktop: Figma-exact absolute layout (tan bg w-1416, h-856) */}
        <div className="relative hidden h-214 overflow-hidden rounded-xl bg-accent-tan md:block">
          {data.label ? (
            <p className="text-mono-s absolute top-6 left-3 w-56.5 text-brand-dark-green">
              {data.label}
            </p>
          ) : null}
          {data.eyebrow ? (
            <p className="text-mono-s absolute top-6 left-178.5 w-56.5 text-brand-dark-green">
              {data.eyebrow}
            </p>
          ) : null}
          {data.cta ? (
            <div className="absolute top-5.5 left-297.5">
              <Button
                href={data.cta.href}
                variant="link"
                icon={<ButtonArrowIcon />}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                {data.cta.label}
              </Button>
            </div>
          ) : null}
          <h2 className="text-h3-serif absolute top-25.5 left-1/2 w-116 -translate-x-1/2 text-center whitespace-nowrap text-brand-dark-green">
            {data.title}
          </h2>
          <div className="absolute top-60.25 right-3 left-3 grid grid-cols-4 gap-3">
            {cards.map((card) => (
              <ArticleCard key={card.href} {...card} />
            ))}
          </div>
        </div>

        {/* Mobile: simple stacked flow */}
        <div className="overflow-hidden rounded-xl bg-accent-tan px-3 pt-6 pb-10 md:hidden">
          <div className="flex items-start justify-between">
            {data.label ? (
              <p className="text-mono-s w-56.5 max-w-[50%] text-brand-dark-green">
                {data.label}
              </p>
            ) : null}
            {data.cta ? (
              <div className="flex w-56.5 max-w-[50%] justify-end">
                <Button
                  href={data.cta.href}
                  variant="link"
                  icon={<ButtonArrowIcon />}
                  className="cursor-pointer transition-opacity hover:opacity-70"
                >
                  {data.cta.label}
                </Button>
              </div>
            ) : null}
          </div>
          <h2 className="text-h3-serif mt-16.25 text-center whitespace-nowrap text-brand-dark-green">
            {data.title}
          </h2>
          <div className="mt-17.5 flex gap-3 overflow-x-auto">
            {cards.map((card) => (
              <ArticleCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
