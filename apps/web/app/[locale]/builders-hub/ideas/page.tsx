import { getLocale } from 'next-intl/server'
import { Pagination } from '@repo/ui'

import {
  getAllIdeas,
  getBuilderHubListingSettings,
} from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'

import {
  BuildersHubBottomCta,
  BuildersHubListingHeader,
} from '@/components/sections/builders-hub'
import { IdeaCard } from '@/components/sections/builders-hub/idea-card'
import { IdeaRow } from '@/components/sections/builders-hub/idea-row'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.ideas

type View = 'grid' | 'list'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isActiveLocale(locale)) {
    throw new Error(`generateMetadata received non-active locale "${locale}"`)
  }
  const settings = await getBuilderHubListingSettings({ page: 'ideas', locale })
  return createDefaultMetadata({
    title: settings.title,
    description: settings.description,
    locale,
    path: ROUTE,
  })
}

const parseView = (raw: string | undefined, fallback: View): View =>
  raw === 'grid' || raw === 'list' ? raw : fallback

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; page?: string }>
}) {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`IdeasPage received non-active locale "${rawLocale}"`)
  }
  const locale = rawLocale
  const sp = await searchParams

  const [settings, allIdeas] = await Promise.all([
    getBuilderHubListingSettings({ page: 'ideas', locale }),
    getAllIdeas({ locale, status: 'published' }),
  ])

  const view = parseView(sp.view, settings.defaultView)
  const totalPages = Math.max(1, Math.ceil(allIdeas.length / settings.pageSize))
  const requestedPage = Number.parseInt(sp.page ?? '1', 10)
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(1, requestedPage), totalPages)
  const start = (currentPage - 1) * settings.pageSize
  const pageIdeas = allIdeas.slice(start, start + settings.pageSize)

  const buildHref = (params: { view?: View; page?: number }): string => {
    const next = new URLSearchParams()
    const v = params.view ?? view
    if (v !== settings.defaultView) next.set('view', v)
    const p = params.page ?? currentPage
    if (p > 1) next.set('page', p.toString())
    const query = next.toString()
    return query ? `${ROUTE}?${query}` : ROUTE
  }

  return (
    <main className="bg-brand-off-white">
      <section className="bg-brand-off-white md:mb-[100px] md:min-h-[971px]">
        <div className="mx-auto max-w-360 px-3 pt-10">
          <BuildersHubListingHeader
            title={settings.title}
            description={settings.description}
            submitCta={settings.submitCta}
            view={view}
            buildViewHref={(v) => buildHref({ view: v, page: 1 })}
            mobileDescription="Lorem ipsum dolor sit amet consectetur. Sed in quis lorem vel proin auctor feugiat ut eget. Enim at in tellus sed fusce odio mi."
            backHref={ROUTES.buildersHub}
          />
        </div>

        {view === 'grid' ? (
          <div className="mx-auto mt-[60px] max-w-360 px-3">
            <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-4">
              {pageIdeas.map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
          </div>
        ) : (
          <ul className="mt-0 w-full md:mt-[60px]">
            {pageIdeas.map((idea, i) => (
              <IdeaRow key={idea.slug} index={start + i + 1} idea={idea} />
            ))}
          </ul>
        )}

        <div className="mt-12 flex justify-center pb-[100px]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getHref={(page) => buildHref({ page })}
          />
        </div>
      </section>

      <BuildersHubBottomCta
        title={settings.bottomCta.title}
        cta={settings.bottomCta.cta}
      />
    </main>
  )
}
