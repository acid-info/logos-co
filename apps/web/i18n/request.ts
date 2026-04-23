import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// docs: https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#i18n-request
export default getRequestConfig(async () => {
  return {
    locale: routing.defaultLocale,
    messages: (await import(`../messages/${routing.defaultLocale}.json`))
      .default,
  }
})
