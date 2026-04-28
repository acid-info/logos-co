import { getLocale } from 'next-intl/server'
import { Pagination } from '@repo/ui'

import { getAllRfps, getBuilderHubListingSettings } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'

import { BuildersHubListingHeader } from '@/components/sections/builders-hub'
import { RfpCard } from '@/components/sections/builders-hub/rfp-card'
import { RfpListRow } from '@/components/sections/builders-hub/rfp-list-row'
import { ROUTES } from '@/constants/routes'
import { createDefaultMetadata } from '@/utils/metadata'

const ROUTE = ROUTES.rfps

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
  const settings = await getBuilderHubListingSettings({ page: 'rfps', locale })
  return createDefaultMetadata({
    title: settings.title,
    description: settings.description,
    locale,
    path: ROUTE,
  })
}

const parseView = (raw: string | undefined, fallback: View): View =>
  raw === 'grid' || raw === 'list' ? raw : fallback

export default async function RfpsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; page?: string }>
}) {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`RfpsPage received non-active locale "${rawLocale}"`)
  }
  const locale = rawLocale
  const sp = await searchParams

  const [settings, allRfps] = await Promise.all([
    getBuilderHubListingSettings({ page: 'rfps', locale }),
    getAllRfps({ locale, status: 'published' }),
  ])

  const view = parseView(sp.view, settings.defaultView)
  const totalPages = Math.max(1, Math.ceil(allRfps.length / settings.pageSize))
  const requestedPage = Number.parseInt(sp.page ?? '1', 10)
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(1, requestedPage), totalPages)
  const start = (currentPage - 1) * settings.pageSize
  const pageRfps = allRfps.slice(start, start + settings.pageSize)

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
      <section className="bg-brand-off-white md:mb-3 md:min-h-[1638px]">
        <div className="mx-auto max-w-360 px-3 pt-10">
          <BuildersHubListingHeader
            title={settings.title}
            description={settings.description}
            submitCta={settings.submitCta}
            view={view}
            buildViewHref={(v) => buildHref({ view: v, page: 1 })}
            mobileDescription="Lorem ipsum dolor sit amet consectetur. Risus ut sollicitudin tortor aliquet sed. Consequat vestibulum lacus mauris mauris."
            mobileSpacious
            backHref={ROUTES.buildersHub}
          />
        </div>

        {view === 'grid' ? (
          <div className="mx-auto mt-[90px] max-w-360 px-3 md:mt-[160px]">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {pageRfps.map((rfp) => (
                <RfpCard key={rfp.slug} rfp={rfp} />
              ))}
            </div>
          </div>
        ) : (
          <ul className="mt-0 w-full md:mt-[60px]">
            {pageRfps.map((rfp, i) => (
              <RfpListRow key={rfp.slug} index={start + i + 1} rfp={rfp} />
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
    </main>
  )
}
