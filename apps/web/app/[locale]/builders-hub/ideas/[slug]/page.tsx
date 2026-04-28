import { notFound } from 'next/navigation'

import { getActiveLocales, isActiveLocale } from '@repo/content/locales'
import { getAllIdeas, getAllRfps, getIdeaBySlug } from '@repo/content/loaders'

import { BuildersHubDetailLayout } from '@/components/sections/builders-hub/builders-hub-detail-layout'
import { Link } from '@/i18n/navigation'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const formatReward = (
  reward: { amount: number; currency: string; xp?: number } | undefined
): string | null => {
  if (!reward) return null
  return reward.xp
    ? `${reward.amount} ${reward.currency} + ${reward.xp} XP`
    : `${reward.amount} ${reward.currency}`
}

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
    const ideas = await getAllIdeas({ locale, status: 'published' })
    for (const idea of ideas) params.push({ locale, slug: idea.slug })
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
    const idea = await getIdeaBySlug(slug, locale)
    return createDefaultMetadata({
      title: idea.title,
      description: idea.tagline ?? idea.summary,
      locale,
      path: `${ROUTES.ideas}/${slug}`,
    })
  } catch {
    return createDefaultMetadata({
      title: 'Idea not found',
      description: 'This idea does not exist or has not been published yet.',
      locale,
      path: `${ROUTES.ideas}/${slug}`,
    })
  }
}

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`IdeaDetailPage received non-active locale "${locale}"`)
  }

  let idea
  try {
    idea = await getIdeaBySlug(slug, locale)
  } catch {
    notFound()
  }
  if (idea.status !== 'published') notFound()

  const submitter = idea.submitter.name
    ? `${idea.submitter.name} (@${idea.submitter.handle})`
    : `@${idea.submitter.handle}`

  const reward = formatReward(idea.reward)

  const meta = [
    { label: 'Status', value: idea.status },
    { label: 'Submitter', value: submitter },
    reward ? { label: 'Reward', value: reward } : null,
    idea.submittedAt
      ? { label: 'Submitted', value: formatDate(idea.submittedAt) }
      : null,
    idea.tags.length > 0
      ? { label: 'Tags', value: idea.tags.join(', ') }
      : null,
  ].filter((x): x is { label: string; value: string } => Boolean(x))

  // Related RFPs footer — computed as the reverse of RFP `relatedIdeas`.
  let related: { slug: string; title: string }[] = []
  if (idea.relatedRfpSlugs.length > 0) {
    const allRfps = await getAllRfps({ locale, status: 'published' })
    const bySlug = new Map(allRfps.map((rfp) => [rfp.slug, rfp]))
    related = idea.relatedRfpSlugs
      .map((s) => bySlug.get(s))
      .filter((rfp): rfp is NonNullable<typeof rfp> => Boolean(rfp))
      .map((rfp) => ({ slug: rfp.slug, title: rfp.title }))
  }

  return (
    <BuildersHubDetailLayout
      backHref={ROUTES.ideas}
      backLabel="All ideas"
      eyebrow={`Idea · ${idea.status}`}
      title={idea.title}
      tagline={idea.tagline}
      description={idea.description}
      primaryCta={
        idea.discussionUrl
          ? {
              label: idea.ctaLabel ?? 'Discuss',
              href: idea.discussionUrl,
              external: true,
            }
          : undefined
      }
      meta={meta}
      footer={
        related.length > 0 ? (
          <>
            <h2 className="font-mono text-[10px] font-medium leading-[1.3] text-brand-dark-green/70 uppercase mb-4">
              Related RFPs
            </h2>
            <ul className="space-y-2">
              {related.map((rfp) => (
                <li key={rfp.slug}>
                  <Link
                    href={`${ROUTES.rfps}/${rfp.slug}`}
                    className="cursor-pointer font-sans text-[14px] leading-[1.4] text-brand-dark-green underline underline-offset-4 hover:opacity-70"
                  >
                    {rfp.title}
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
