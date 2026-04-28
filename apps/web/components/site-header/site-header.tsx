/**
 * @figma-node  40009046:23459 (Nav section — closed + open)
 *              40009046:23458 (D2 Nav instance — bar)
 *              40009046:23534 (open desktop, 1440)
 *              40009046:23460 (open mobile, 393)
 *
 * Site header = fixed 40px top bar + <NavOverlay> (dialog from @repo/ui).
 * The overlay is a shared primitive — this server component owns the data
 * pipeline (loader → mapped UI props) and hands everything off to the client
 * shell that owns the interactivity.
 */
import Image from 'next/image'
import { getLocale } from 'next-intl/server'
import { getNavigation } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  NavOverlayCommunityCard,
  NavOverlayLink,
  NavOverlayPressItem,
} from '@repo/ui'

import SiteHeaderClient from './site-header-client'

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

export default async function SiteHeader() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`SiteHeader received non-active locale "${rawLocale}"`)
  }
  const navigation = await getNavigation(rawLocale)

  const sitemap: NavOverlayLink[] = navigation.sitemap

  const community: NavOverlayCommunityCard[] = navigation.communityCards.map((card) => ({
    label: card.label,
    href: card.href,
    description: card.description,
    image: (
      <Image
        src={card.image.src}
        alt={card.image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    ),
  }))

  const press: NavOverlayPressItem[] = navigation.press.articles.map((article) => ({
    date: article.displayDate ?? formatPressDateUTC(article.publishedAt),
    headline: article.title,
    href: article.externalUrl,
    image: (
      <Image src={article.image.src} alt={article.image.alt} fill sizes="160px" />
    ),
  }))

  return (
    <SiteHeaderClient
      closedBar={navigation.closedBar}
      sitemap={sitemap}
      community={community}
      press={press}
      pressSeeAllHref={navigation.press.seeAllHref}
    />
  )
}
