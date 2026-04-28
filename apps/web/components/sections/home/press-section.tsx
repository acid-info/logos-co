import Image from 'next/image'

import type { PressArticle } from '@repo/content/loaders'
import type { RelatedArticlesSection } from '@repo/content/schemas'

import { Button, ButtonArrowIcon } from '@/components/ui'
import { Link } from '@/i18n/navigation'

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

interface PressCardProps {
  title: string
  imageSrc: string
  imageAlt: string
  date: string
  author: string
  href: string
  external: boolean
}

function PressCard({
  title,
  imageSrc,
  imageAlt,
  date,
  author,
  href,
  external,
}: PressCardProps) {
  // External press articles open in a new tab; internal links use the
  // i18n-aware Link to keep route prefixes stable.
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex cursor-pointer flex-col gap-1.5"
      >
        <CardBody
          title={title}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          date={date}
          author={author}
        />
      </a>
    )
  }
  return (
    <Link href={href} className="group flex cursor-pointer flex-col gap-1.5">
      <CardBody
        title={title}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        date={date}
        author={author}
      />
    </Link>
  )
}

function CardBody({
  title,
  imageSrc,
  imageAlt,
  date,
  author,
}: {
  title: string
  imageSrc: string
  imageAlt: string
  date: string
  author: string
}) {
  return (
    <>
      <div className="aspect-339/431 w-full overflow-hidden bg-brand-dark-green/10">
        <Image
          src={imageSrc}
          alt={imageAlt}
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
          {author ? (
            <p className="text-eyebrow text-brand-dark-green">{author}</p>
          ) : null}
        </div>
      </div>
    </>
  )
}

type Props = {
  data: RelatedArticlesSection
  articles: PressArticle[]
}

export default function PressSection({ data, articles }: Props) {
  const cards = articles.map((article) => ({
    title: article.title,
    imageSrc: article.image.src,
    imageAlt: article.image.alt || article.title,
    date: article.displayDate ?? formatPressDateUTC(article.publishedAt),
    author: article.author?.name ?? '',
    href: article.externalUrl,
    external: article.externalUrl.startsWith('https://'),
  }))

  return (
    <section id="press" className="bg-brand-off-white py-20 md:py-28">
      <div className="mx-auto max-w-354 px-3">
        <div className="overflow-hidden rounded-xl bg-accent-tan px-3 pt-6 pb-40">
          {/* Top row: 3 columns */}
          <div className="flex items-start justify-between">
            {data.label ? (
              <p className="text-mono-s text-brand-dark-green w-56.5">
                {data.label}
              </p>
            ) : null}
            {data.eyebrow ? (
              <p className="text-mono-s text-brand-dark-green text-center">
                {data.eyebrow}
              </p>
            ) : null}
            {data.cta ? (
              <div className="w-56.5 flex justify-end">
                <Button
                  href={data.cta.href}
                  variant="link"
                  icon={<ButtonArrowIcon />}
                  className="transition-opacity hover:opacity-70"
                >
                  {data.cta.label}
                </Button>
              </div>
            ) : null}
          </div>

          <h2 className="text-h1 text-brand-dark-green mt-[65px] text-center">
            {data.title}
          </h2>

          <div className="mt-17.75 grid grid-cols-2 gap-3 md:grid-cols-4">
            {cards.map((card) => (
              <PressCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
