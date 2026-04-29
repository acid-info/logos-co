import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { isActiveLocale } from '@repo/content/locales'

import { ROUTES } from '@/constants/routes'
import {
  PRESS_ORIGIN,
  getPressPageData,
  repeatToLength,
  type PressArticleRow,
  type PressPodcastRow,
} from '@/lib/press-engine'
import { createDefaultMetadata } from '@/utils/metadata'

const PRESS_HERO_IMAGE = '/images/press-engine/press-hero.jpg'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.press' })
  return createDefaultMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: ROUTES.press,
  })
}

function Dot({ className = 'bg-brand-dark-green' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`size-[3px] rounded-full ${className}`}
    />
  )
}

function TextLink({
  children,
  href,
  label,
  tone = 'dark',
  className = '',
}: {
  children: React.ReactNode
  href: string
  label?: string
  tone?: 'dark' | 'light'
  className?: string
}) {
  const toneClass =
    tone === 'light'
      ? 'text-brand-off-white decoration-brand-off-white/50'
      : 'text-brand-dark-green decoration-brand-dark-green/50'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`font-mono text-[10px] font-semibold leading-[1.35] uppercase underline underline-offset-[3px] transition-opacity hover:opacity-70 ${toneClass} ${className}`}
    >
      {children}
    </a>
  )
}

function UnderlineLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] font-semibold uppercase leading-[1.35] text-brand-dark-green underline decoration-brand-dark-green/50 underline-offset-[3px]">
      {children}
    </span>
  )
}

function PlayIcon({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex size-[30px] shrink-0 items-center justify-center rounded-full border ${
        inverted ? 'border-brand-off-white' : 'border-brand-dark-green'
      }`}
    >
      <span
        className={`ml-[2px] h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent ${
          inverted ? 'border-l-brand-off-white' : 'border-l-brand-dark-green'
        }`}
      />
    </span>
  )
}

function getAlternatingRowBackground(index: number) {
  return index % 2 === 1 ? 'bg-brand-off-white/10' : 'bg-brand-dark-green/10'
}

function PressRowLink({
  href,
  index,
  className,
  children,
}: {
  href: string
  index: number
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden text-brand-dark-green transition-colors duration-200 hover:bg-brand-yellow focus-visible:bg-brand-yellow ${getAlternatingRowBackground(index)} ${className}`}
    >
      {children}
    </a>
  )
}

function RowThumbnail({ src, className }: { src: string; className: string }) {
  return (
    <div className={`absolute aspect-video overflow-hidden ${className}`}>
      <Image
        src={src}
        alt=""
        width={107}
        height={60}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function PressHero({ lead }: { lead: PressArticleRow }) {
  return (
    <section className="h-[374px] bg-accent-tan px-3 pt-6 md:h-[342px] md:pb-[100px]">
      <div className="mx-auto flex w-full max-w-[370px] flex-col gap-[100px] md:max-w-[1416px] md:gap-10">
        <div className="relative h-[81px] w-full md:w-[1186px]">
          <div className="absolute left-0 top-0 aspect-video w-[107px] overflow-hidden">
            <Image
              src={PRESS_HERO_IMAGE}
              alt=""
              width={107}
              height={60}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <p className="text-mono-s absolute left-[191px] top-0 w-[179px] text-brand-dark-green md:left-[714px] md:w-[226px]">
            {lead.description || lead.title}
          </p>
        </div>
        <h1 className="font-display text-center text-[40px] leading-none tracking-[-0.03em] text-brand-dark-green md:text-[56px] md:tracking-normal">
          <span className="block">The Logos</span>
          <span className="block">Press Engine</span>
        </h1>
      </div>
    </section>
  )
}

function ArticleEntry({
  article,
  index,
}: {
  article: PressArticleRow
  index: number
}) {
  const titleRest = article.titleSerif
    ? article.title.replace(article.titleSerif, '').trim()
    : article.title

  return (
    <PressRowLink
      href={article.href}
      index={index}
      className="h-[158px] md:h-[158px]"
    >
      <RowThumbnail
        src={article.image}
        className="left-3 top-3 w-[107px] md:block"
      />
      <div className="absolute left-[119px] top-0 flex h-full w-[274px] flex-col justify-center gap-1.5 py-3 pl-3 md:left-[119px] md:grid md:w-[1150px] md:grid-cols-[595px_345px_1fr] md:gap-x-3 md:p-0">
        <div className="flex flex-col justify-center gap-1.5 md:justify-start md:py-3 md:pl-3">
          <div className="text-mono-s flex items-center gap-2.5 text-brand-dark-green">
            <span>{article.date}</span>
            <Dot />
            <span>{article.author}</span>
          </div>
          <div className="w-[250px] text-[18px] leading-[1.15] tracking-[-0.01em] text-brand-dark-green md:w-full md:max-w-[333px] md:tracking-normal">
            {article.titleSerif ? (
              <>
                <span className="font-display block leading-[1.1]">
                  {article.titleSerif}
                </span>
                <span className="font-sans block">{titleRest}</span>
              </>
            ) : (
              <span className="font-sans">{article.title}</span>
            )}
          </div>
        </div>
        <p className="text-mono-s hidden max-w-[345px] text-brand-dark-green md:block md:py-3">
          {article.description}
        </p>
        <div className="hidden md:block md:py-3">
          <UnderlineLabel>{article.readingTime} min read</UnderlineLabel>
        </div>
      </div>
    </PressRowLink>
  )
}

function GallerySection({ articles }: { articles: PressArticleRow[] }) {
  return (
    <section className="h-[319px] overflow-x-auto overflow-y-hidden bg-accent-tan md:h-auto md:overflow-visible md:px-3 md:py-10">
      <div className="flex w-max gap-3 py-10 pl-3 pr-3 md:grid md:w-auto md:grid-cols-4 md:p-0">
        {articles.map((article) => (
          <a
            key={article.title}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[339px] shrink-0 flex-col gap-1.5 text-brand-dark-green md:w-auto"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-brand-dark-green/10">
              <Image
                src={article.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 345px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <p className="max-w-[170px] font-sans text-[12px] font-medium leading-[1.2] tracking-normal md:text-[14px]">
                {article.title}
              </p>
              <div className="text-mono-s shrink-0 text-brand-dark-green md:text-right">
                <p>{article.galleryDate}</p>
                <p>{article.author}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function FeaturedArticle({ article }: { article: PressArticleRow }) {
  return (
    <section className="relative h-[994px] overflow-hidden bg-accent-tan md:flex md:h-[1044px] md:justify-center md:gap-3 md:overflow-visible md:pr-3">
      <div className="absolute left-0 top-0 z-10 h-[313px] w-full px-3 pt-10 md:sticky md:top-10 md:h-[495px] md:flex-1 md:pl-[129px] md:pt-[100px]">
        <div className="flex max-w-[573px] flex-col gap-6 md:gap-[30px]">
          <div className="text-mono-s flex items-center gap-2.5 text-brand-off-white md:text-brand-dark-green">
            <span>{article.author}</span>
            <Dot className="bg-brand-off-white md:bg-brand-dark-green" />
            <span>{article.date}</span>
          </div>
          <h2 className="font-display max-w-[370px] text-[40px] leading-none tracking-[-0.03em] text-brand-off-white md:max-w-[464px] md:text-[56px] md:tracking-normal md:text-brand-dark-green">
            {article.title}
          </h2>
          <div className="flex flex-col gap-5">
            <p className="text-mono-s max-w-[370px] text-brand-off-white md:max-w-[456px] md:text-brand-dark-green">
              {article.description}
            </p>
            <TextLink
              href={article.href}
              label={`Read ${article.title}`}
              tone="light"
              className="md:text-brand-dark-green md:decoration-brand-dark-green/50"
            >
              Read Article
            </TextLink>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 h-[994px] overflow-hidden md:relative md:inset-auto md:h-[994px] md:w-[714px] md:shrink-0">
        <Image
          src={article.image}
          alt=""
          width={1242}
          height={994}
          className="absolute left-[-303px] top-0 h-[1040px] w-[1300px] max-w-none object-cover md:left-[-104px] md:h-full md:w-[1242px]"
        />
      </div>
    </section>
  )
}

function PodcastHero({ latestPodcast }: { latestPodcast: PressPodcastRow }) {
  return (
    <div className="h-[723px] bg-accent-tan p-3 md:h-[430px]">
      <div className="relative h-[699px] overflow-hidden rounded-xl md:h-[406px]">
        <Image
          src="/images/press-engine/podcast-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover object-center blur-[20px]"
        />
        <div className="absolute left-3 top-3 flex h-[268px] w-[345px] max-w-[calc(100%-24px)] flex-col justify-between text-brand-off-white md:h-[380px] md:w-[453px]">
          <div className="flex items-center gap-[102px]">
            <span className="font-display text-[12px] leading-none">λ</span>
            <span className="font-mono text-[10px] font-medium uppercase leading-[1.3]">
              Media
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-[24px] leading-[1.1] tracking-normal">
              Logos Podcast
            </h3>
            <p className="text-mono-s max-w-[453px] text-brand-off-white">
              Logos Podcast is a bi-weekly interview show about building
              sovereign communities: the people, philosophies, challenges, and
              solutions. We invite the world&apos;s foremost experts and radical
              thinks to discuss how to emancipate from repressive systems
              through new social, political, and economic institutions.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <PlayIcon inverted />
            <span className="font-sans text-[14px] font-medium leading-[1.2]">
              Latest episode
            </span>
            <span className="font-display text-[14px] leading-[1.2] whitespace-nowrap text-gray-02">
              {latestPodcast.title}
            </span>
          </div>
        </div>
        <div className="absolute left-3 top-[397px] flex h-[290px] w-[350px] items-center justify-center rounded-[100px] bg-accent-tan md:left-auto md:right-3 md:top-3 md:h-[382px] md:w-[702px] md:max-w-[calc(100%-24px)]">
          <TextLink href={PRESS_ORIGIN} className="no-underline">
            See all episodes →
          </TextLink>
        </div>
      </div>
    </div>
  )
}

function PodcastEntry({
  podcast,
  index,
}: {
  podcast: PressPodcastRow
  index: number
}) {
  return (
    <PressRowLink
      href={podcast.href}
      index={index}
      className="h-[174px] md:h-[131px]"
    >
      <RowThumbnail
        src={podcast.image}
        className="right-[11px] top-3 w-[107px] md:left-3 md:right-auto"
      />
      <div className="absolute left-3 top-[13px] flex w-[238px] flex-col gap-2.5 md:hidden">
        <PlayIcon />
        <p className="font-sans text-[18px] leading-[1.15] tracking-[-0.01em]">
          {podcast.title}
        </p>
      </div>
      <div className="text-mono-s absolute bottom-[15px] left-3 flex items-center gap-2.5 text-brand-dark-green md:hidden">
        <span>{podcast.date}</span>
        <Dot />
        <span>{podcast.duration}</span>
      </div>
      <div className="absolute bottom-[13px] right-[11px] md:hidden">
        <UnderlineLabel>Listen on an app</UnderlineLabel>
      </div>
      <div className="hidden min-h-[131px] flex-col justify-between pb-3 pl-[131px] pr-3 pt-3 md:absolute md:left-[119px] md:top-0 md:grid md:h-[119px] md:w-[1150px] md:grid-cols-[595px_345px_1fr] md:gap-x-3 md:p-0">
        <div className="flex flex-col justify-between md:h-[131px] md:py-3 md:pl-3">
          <div className="text-mono-s flex items-center gap-2.5 text-brand-dark-green">
            <span>{podcast.date}</span>
            <Dot />
            <span>{podcast.duration}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <PlayIcon />
            <p className="font-sans text-[18px] leading-[1.15] tracking-normal">
              {podcast.title}
            </p>
          </div>
        </div>
        <div />
        <div className="md:py-3">
          <UnderlineLabel>Listen on an app</UnderlineLabel>
        </div>
      </div>
    </PressRowLink>
  )
}

function PodcastsSection({ podcasts }: { podcasts: PressPodcastRow[] }) {
  const repeatedPodcasts = repeatToLength(podcasts, 8)

  return (
    <section className="h-[2249px] bg-accent-tan pt-[100px] md:h-[1616px]">
      <div className="flex h-[22px] items-center pl-3 md:h-[26px]">
        <h2 className="font-display text-[36px] leading-none tracking-normal text-brand-dark-green">
          Podcasts
        </h2>
      </div>
      <div className="mt-3 bg-accent-tan">
        <PodcastHero latestPodcast={podcasts[0]} />
        {repeatedPodcasts.map((podcast, index) => (
          <PodcastEntry
            key={`${podcast.title}-${index}`}
            podcast={podcast}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`PressPage received non-active locale "${locale}"`)
  }

  const { articles, podcasts } = await getPressPageData()
  if (articles.length === 0) {
    throw new Error('Press page requires at least one article from press API')
  }
  if (podcasts.length === 0) {
    throw new Error('Press page requires at least one podcast from press API')
  }

  const repeatedArticles = repeatToLength(articles, 12)
  const galleryArticles = articles.slice(0, 4)
  const featuredArticle =
    articles.find((article) => article.href.endsWith('/article/realfi-hack')) ??
    articles[0]

  return (
    <div className="bg-accent-tan pt-10">
      <PressHero lead={articles[0]} />
      <section className="bg-accent-tan">
        {repeatedArticles.slice(0, 4).map((article, index) => (
          <ArticleEntry key={`top-${index}`} article={article} index={index} />
        ))}
        <GallerySection articles={galleryArticles} />
        {repeatedArticles.slice(4, 8).map((article, index) => (
          <ArticleEntry key={`mid-${index}`} article={article} index={index} />
        ))}
        <FeaturedArticle article={featuredArticle} />
        {repeatedArticles.slice(8, 12).map((article, index) => (
          <ArticleEntry
            key={`bottom-${index}`}
            article={article}
            index={index}
          />
        ))}
      </section>
      <PodcastsSection podcasts={podcasts} />
    </div>
  )
}
