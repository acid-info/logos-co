import { fileURLToPath } from 'node:url'

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: process.env.BASE_PATH || undefined,
  images: {
    unoptimized: true,
  },
  ...(isProduction && { output: 'export' }),
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  trailingSlash: false,
  turbopack: {
    root: workspaceRoot,
  },
}

export default withNextIntl(nextConfig)
