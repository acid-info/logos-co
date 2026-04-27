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
import { getActiveLocales } from '../src/locales/registry.js'
import { getFooter, getNavigation, getSiteSettings } from '../src/loaders/site.js'

type Check = {
  name: string
  run: () => Promise<unknown>
}

const buildSiteChecks = (): Check[] => {
  const locales = getActiveLocales()
  const checks: Check[] = []
  for (const locale of locales) {
    checks.push(
      { name: `site.settings (${locale})`, run: () => getSiteSettings(locale) },
      { name: `site.footer (${locale})`, run: () => getFooter(locale) },
      { name: `site.navigation (${locale})`, run: () => getNavigation(locale) },
    )
  }
  return checks
}

const main = async (): Promise<void> => {
  const checks = [...buildSiteChecks()]
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
