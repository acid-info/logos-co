import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

const isProduction = process.env.NODE_ENV === 'production'

// docs: https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#i18n-request
export default getRequestConfig(async ({ requestLocale }) => {
  if (isProduction) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../messages/${routing.defaultLocale}.json`))
        .default,
    }
  }

  const requested = await requestLocale
  const locale =
    requested && hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
