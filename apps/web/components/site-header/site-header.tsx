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
import { getNavigation } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'
import type {
  NavOverlayCommunityCard,
  NavOverlayLink,
  NavOverlayPressItem,
} from '@repo/ui'

import { getLatestPressArticles } from '@/lib/press-engine'

import SiteHeaderClient from './site-header-client'

export default async function SiteHeader({ locale }: { locale: string }) {
  if (!isActiveLocale(locale)) {
    throw new Error(`SiteHeader received non-active locale "${locale}"`)
  }
  const [navigation, latestPressArticles] = await Promise.all([
    getNavigation(locale),
    getLatestPressArticles(4),
  ])

  const sitemap: NavOverlayLink[] = navigation.sitemap

  const community: NavOverlayCommunityCard[] = navigation.communityCards.map(
    (card) => ({
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
    })
  )

  const press: NavOverlayPressItem[] = latestPressArticles.map((article) => ({
    date: article.galleryDate,
    headline: article.title,
    href: article.href,
    image: <Image src={article.image} alt="" fill sizes="160px" />,
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
