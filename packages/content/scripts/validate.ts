/**
 * Smoke validator for the content fixtures shipped with this repo.
 *
 * Walks the active locales, calls each loader against the on-disk fixtures,
 * and reports pass/fail counts. Exits non-zero on the first failure so CI
 * can gate merges on it.
 *
 * Phase 1 covers the loaders that have fixtures land first; the remaining
 * loaders are added as the corresponding fixtures appear.
 */
import type { Language } from '../src/schemas/common.js'

import {
  getAllIdeas,
  getAllRfps,
  getBuilderHubListingSettings,
  getBuilderHubSettings,
  getBuilderResources,
  resolveBuilderHubHomeIdeas,
  resolveBuilderHubHomeRfps,
} from '../src/loaders/builders-hub.js'
import {
  getCircleResources,
  getCircles,
  getCirclesSettings,
} from '../src/loaders/circles.js'
import { getPressArticles } from '../src/loaders/press.js'
import { getFooter, getNavigation, getSiteSettings } from '../src/loaders/site.js'
import { getActiveLocales } from '../src/locales/registry.js'

type Check = {
  name: string
  run: () => Promise<unknown>
}

const buildSiteChecks = (locale: Language): Check[] => [
  { name: `site.settings (${locale})`, run: () => getSiteSettings(locale) },
  { name: `site.footer (${locale})`, run: () => getFooter(locale) },
  {
    name: `site.navigation (${locale}) → press.articles populated`,
    run: async () => {
      const nav = await getNavigation(locale)
      if (nav.press.articles.length === 0) {
        throw new Error('expected at least one resolved press article in nav.press.articles')
      }
      return nav
    },
  },
]

const buildPressChecks = (locale: Language): Check[] => [
  {
    name: `press.articles (${locale}) → at least one published article`,
    run: async () => {
      const articles = await getPressArticles({ locale, status: 'published' })
      if (articles.length === 0) {
        throw new Error('no published press articles found')
      }
      return articles
    },
  },
  {
    name: `press.articles (${locale}) → sorted by publishedAt desc`,
    run: async () => {
      const articles = await getPressArticles({ locale, status: 'published' })
      for (let i = 1; i < articles.length; i++) {
        if (articles[i - 1].publishedAt < articles[i].publishedAt) {
          throw new Error(
            `out-of-order: "${articles[i - 1].slug}" (${articles[i - 1].publishedAt}) ` +
              `before "${articles[i].slug}" (${articles[i].publishedAt})`,
          )
        }
      }
      return articles
    },
  },
]

const buildBuilderHubChecks = (locale: Language): Check[] => [
  {
    name: `builders-hub.settings (${locale})`,
    run: () => getBuilderHubSettings(locale),
  },
  {
    name: `builders-hub.resources (${locale}) → at least one published item`,
    run: async () => {
      const items = await getBuilderResources({ locale, status: 'published' })
      if (items.length === 0) {
        throw new Error('expected at least one published builder resource')
      }
      return items
    },
  },
  {
    name: `builders-hub.listings.ideas (${locale})`,
    run: () => getBuilderHubListingSettings({ page: 'ideas', locale }),
  },
  {
    name: `builders-hub.listings.rfps (${locale})`,
    run: () => getBuilderHubListingSettings({ page: 'rfps', locale }),
  },
  {
    name: `builders-hub.rfps (${locale}) → at least one published RFP`,
    run: async () => {
      const rfps = await getAllRfps({ locale, status: 'published' })
      if (rfps.length === 0) {
        throw new Error('no published RFPs found')
      }
      return rfps
    },
  },
  {
    name: `builders-hub.rfps (${locale}) → canonical sort (order asc, then publishedAt desc)`,
    run: async () => {
      const rfps = await getAllRfps({ locale, status: 'published' })
      for (let i = 1; i < rfps.length; i++) {
        const prevOrder = rfps[i - 1].order ?? Number.MAX_SAFE_INTEGER
        const curOrder = rfps[i].order ?? Number.MAX_SAFE_INTEGER
        if (prevOrder > curOrder) {
          throw new Error(
            `out-of-order: "${rfps[i - 1].slug}" (order=${prevOrder}) before "${rfps[i].slug}" (order=${curOrder})`,
          )
        }
      }
      return rfps
    },
  },
  {
    name: `builders-hub.home rfps (${locale}) → resolves with terminator card`,
    run: async () => {
      const result = await resolveBuilderHubHomeRfps(locale)
      if (result.rfps.length === 0) {
        throw new Error('home grid resolved to zero RFPs')
      }
      if (!result.terminator) {
        throw new Error('terminator card not resolved')
      }
      if (result.terminator.kind === 'see-all-ideas' && result.terminator.thumbnailIdeas.length === 0) {
        throw new Error('see-all-ideas terminator resolved with zero thumbnail ideas')
      }
      return result
    },
  },
  {
    name: `builders-hub.ideas (${locale}) → at least one published Idea + reverse refs computed`,
    run: async () => {
      const ideas = await getAllIdeas({ locale, status: 'published' })
      if (ideas.length === 0) {
        throw new Error('no published Ideas found')
      }
      // Every Idea must carry a relatedRfpSlugs array (possibly empty).
      for (const idea of ideas) {
        if (!Array.isArray(idea.relatedRfpSlugs)) {
          throw new Error(`Idea "${idea.slug}" missing relatedRfpSlugs array`)
        }
      }
      // quadratic-voting is referenced by secure-decentralized-frontends.relatedIdeas
      // → its reverse ref must contain that RFP slug.
      const qv = ideas.find((i) => i.slug === 'quadratic-voting')
      if (qv && !qv.relatedRfpSlugs.includes('secure-decentralized-frontends')) {
        throw new Error(
          `quadratic-voting.relatedRfpSlugs missing "secure-decentralized-frontends": got [${qv.relatedRfpSlugs.join(', ')}]`,
        )
      }
      return ideas
    },
  },
  {
    name: `builders-hub.home ideas (${locale}) → resolves`,
    run: async () => {
      const result = await resolveBuilderHubHomeIdeas(locale)
      if (result.ideas.length === 0) {
        throw new Error('home table resolved to zero Ideas')
      }
      return result
    },
  },
]

const buildCirclesChecks = (locale: Language): Check[] => [
  {
    name: `circles.settings (${locale})`,
    run: () => getCirclesSettings(locale),
  },
  {
    name: `circles.resources (${locale}) → at least one published item`,
    run: async () => {
      const items = await getCircleResources({ locale, status: 'published' })
      if (items.length === 0) {
        throw new Error('expected at least one published circle resource')
      }
      return items
    },
  },
  {
    name: `circles (${locale}) → at least one published Circle`,
    run: async () => {
      const circles = await getCircles({ locale, status: 'published' })
      if (circles.length === 0) {
        throw new Error('no published Circles found')
      }
      return circles
    },
  },
  {
    name: `circles (${locale}) → canonical sort (order asc, then slug)`,
    run: async () => {
      const circles = await getCircles({ locale, status: 'published' })
      for (let i = 1; i < circles.length; i++) {
        const prev = circles[i - 1].order ?? Number.MAX_SAFE_INTEGER
        const cur = circles[i].order ?? Number.MAX_SAFE_INTEGER
        if (prev > cur) {
          throw new Error(
            `out-of-order: "${circles[i - 1].slug}" (order=${prev}) before "${circles[i].slug}" (order=${cur})`,
          )
        }
      }
      return circles
    },
  },
  {
    name: `circles (${locale}) → detailBackLink default applied + override honoured + coordinatesGeoJson present`,
    run: async () => {
      const circles = await getCircles({ locale, status: 'published' })
      for (const circle of circles) {
        if (!circle.detailBackLink) {
          throw new Error(`circle "${circle.slug}" missing detailBackLink (default should always apply)`)
        }
        if (!Array.isArray(circle.coordinatesGeoJson) || circle.coordinatesGeoJson.length !== 2) {
          throw new Error(`circle "${circle.slug}" missing coordinatesGeoJson [lng, lat]`)
        }
        const [lng, lat] = circle.coordinatesGeoJson
        if (lng !== circle.coordinates.lng || lat !== circle.coordinates.lat) {
          throw new Error(`circle "${circle.slug}" coordinatesGeoJson does not match coordinates`)
        }
      }
      // Florianópolis was authored with an explicit detailBackLink override
      // ("Back to all circles") — verify the override survives the loader.
      const flori = circles.find((c) => c.slug === 'florianopolis')
      if (flori && flori.detailBackLink.label !== 'Back to all circles') {
        throw new Error(
          `florianopolis detailBackLink override lost: got "${flori.detailBackLink.label}"`,
        )
      }
      // Any circle without an explicit override should land on the loader default.
      const la = circles.find((c) => c.slug === 'los-angeles')
      if (la && la.detailBackLink.label !== 'All circles') {
        throw new Error(
          `los-angeles detailBackLink default not applied: got "${la.detailBackLink.label}"`,
        )
      }
      return circles
    },
  },
]

const main = async (): Promise<void> => {
  const locales = getActiveLocales()
  const checks: Check[] = []
  for (const locale of locales) {
    checks.push(
      ...buildSiteChecks(locale),
      ...buildPressChecks(locale),
      ...buildBuilderHubChecks(locale),
      ...buildCirclesChecks(locale),
    )
  }

  let failed = 0
  for (const check of checks) {
    try {
      await check.run()
      console.log(`ok    ${check.name}`)
    } catch (err) {
      failed++
      const message = err instanceof Error ? err.message : String(err)
      console.error(`FAIL  ${check.name}: ${message}`)
    }
  }

  console.log('')
  console.log(`${checks.length - failed}/${checks.length} checks passed`)
  if (failed > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
