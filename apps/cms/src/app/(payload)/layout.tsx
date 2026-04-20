import type { ReactNode } from 'react'

import {
  RootLayout,
  handleServerFunctions,
  metadata,
} from '@payloadcms/next/layouts'

import config from '@payload-config'
import { importMap } from './admin/importMap'

export { metadata }

const serverFunction = async (
  ...args: Parameters<typeof handleServerFunctions>
) => {
  'use server'

  const [payloadArgs] = args
  return handleServerFunctions({
    ...payloadArgs,
    config,
    importMap,
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
