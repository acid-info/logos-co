import { notFound } from 'next/navigation'

import { getActiveLocales, isActiveLocale } from '@repo/content/locales'
import { getAllIdeas, getAllRfps, getRfpBySlug } from '@repo/content/loaders'

import { BuildersHubDetailLayout } from '@/components/sections/builders-hub/builders-hub-detail-layout'
import { Link } from '@/i18n/navigation'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const formatReward = (reward: {
  amount: number
  currency: string
  xp?: number
}): string =>
  reward.xp
    ? `${reward.amount} ${reward.currency} + ${reward.xp} XP`
    : `${reward.amount} ${reward.currency}`

const formatDate = (iso: string): string => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []
  for (const locale of getActiveLocales()) {
    const rfps = await getAllRfps({ locale, status: 'published' })
    for (const rfp of rfps) params.push({ locale, slug: rfp.slug })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`generateMetadata received non-active locale "${locale}"`)
  }
  try {
    const rfp = await getRfpBySlug(slug, locale)
    return createDefaultMetadata({
      title: rfp.title,
      description: rfp.tagline ?? rfp.summary,
      locale,
      path: `${ROUTES.rfps}/${slug}`,
    })
  } catch {
    return createDefaultMetadata({
      title: 'RFP not found',
      description: 'This RFP does not exist or has not been published yet.',
      locale,
      path: `${ROUTES.rfps}/${slug}`,
    })
  }
}

export default async function RfpDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`RfpDetailPage received non-active locale "${locale}"`)
  }

  let rfp
  try {
    rfp = await getRfpBySlug(slug, locale)
  } catch {
    notFound()
  }
  if (rfp.status !== 'published') notFound()

  const meta = [
    { label: 'Status', value: rfp.status },
    { label: 'Reward', value: formatReward(rfp.reward) },
    rfp.publishedAt
      ? { label: 'Published', value: formatDate(rfp.publishedAt) }
      : null,
    rfp.closesAt ? { label: 'Closes', value: formatDate(rfp.closesAt) } : null,
    rfp.owner
      ? {
          label: 'Owner',
          value: rfp.owner.handle
            ? `${rfp.owner.name} (@${rfp.owner.handle})`
            : rfp.owner.name,
        }
      : null,
    rfp.tags.length > 0 ? { label: 'Tags', value: rfp.tags.join(', ') } : null,
  ].filter((x): x is { label: string; value: string } => Boolean(x))

  // Related ideas footer — if the RFP declares related-ideas, show titles + links.
  let related: { slug: string; title: string }[] = []
  if (rfp.relatedIdeas && rfp.relatedIdeas.length > 0) {
    const allIdeas = await getAllIdeas({ locale, status: 'published' })
    const bySlug = new Map(allIdeas.map((idea) => [idea.slug, idea]))
    related = rfp.relatedIdeas
      .map((s) => bySlug.get(s))
      .filter((idea): idea is NonNullable<typeof idea> => Boolean(idea))
      .map((idea) => ({ slug: idea.slug, title: idea.title }))
  }

  return (
    <BuildersHubDetailLayout
      backHref={ROUTES.rfps}
      backLabel="All RFPs"
      eyebrow={`RFP · ${rfp.status}`}
      title={rfp.title}
      tagline={rfp.tagline}
      description={rfp.description}
      primaryCta={{
        label: rfp.ctaLabel ?? 'Apply',
        href: rfp.applyUrl,
        external: /^https?:\/\//.test(rfp.applyUrl),
      }}
      meta={meta}
      footer={
        related.length > 0 ? (
          <>
            <h2 className="font-mono text-[10px] font-medium leading-[1.3] text-brand-dark-green/70 uppercase mb-4">
              Related ideas
            </h2>
            <ul className="space-y-2">
              {related.map((idea) => (
                <li key={idea.slug}>
                  <Link
                    href={`${ROUTES.ideas}/${idea.slug}`}
                    className="cursor-pointer font-sans text-[14px] leading-[1.4] text-brand-dark-green underline underline-offset-4 hover:opacity-70"
                  >
                    {idea.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null
      }
    />
  )
}
