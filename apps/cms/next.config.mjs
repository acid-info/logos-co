import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/next/withPayload'

const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url))

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: workspaceRoot,
  },
}

export default withPayload(nextConfig)
