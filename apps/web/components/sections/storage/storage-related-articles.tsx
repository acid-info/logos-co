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
        <p className="text-caption-sans flex-1 font-medium text-brand-dark-green md:text-[14px] md:leading-[1.2]">
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

export default function StorageRelatedArticles({ data, articles }: Props) {
  const cards = articles.map((article) => ({
    title: article.title,
    imageSrc: article.image.src,
    imageAlt: article.image.alt || article.title,
    date: article.displayDate ?? formatPressDateUTC(article.publishedAt),
    author: article.author?.name ?? '',
    href: article.externalUrl,
  }))

  return (
    <section className="mt-15 bg-brand-off-white md:mt-25">
      <div className="mx-auto h-220 max-w-360 px-3 py-3">
        <div className="relative h-full overflow-hidden rounded-xl bg-accent-tan">
          {data.label ? (
            <p className="text-mono-s absolute top-6 left-3 w-56.5 text-brand-dark-green">
              {data.label}
            </p>
          ) : null}
          {data.eyebrow ? (
            <p className="text-mono-s absolute top-6 left-178.5 hidden w-56.5 text-brand-dark-green md:block">
              {data.eyebrow}
            </p>
          ) : null}
          {data.cta ? (
            <div className="absolute top-5.5 right-12 md:right-[87px]">
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
          <div className="absolute top-60.25 right-0 left-6 flex gap-3 overflow-x-auto md:right-3 md:left-3 md:grid md:grid-cols-4 md:overflow-visible">
            {cards.map((card) => (
              <ArticleCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
