import { fileURLToPath } from 'node:url'

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url))

const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig = {
  basePath: process.env.BASE_PATH || undefined,
  images: {
    unoptimized: Boolean(process.env.UNOPTIMIZED),
  },
  output: process.env.EXPORT ? 'export' : undefined,
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  trailingSlash: false,
  turbopack: {
    root: workspaceRoot,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
