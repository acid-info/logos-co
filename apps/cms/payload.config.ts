import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Pages } from './src/collections/Pages'
import { Users } from './src/collections/Users'
import { SiteSettings } from './src/globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
const frontendURL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Pages],
  cors: [serverURL, frontendURL],
  csrf: [serverURL, frontendURL],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./cms.db',
    },
    wal: true,
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  serverURL,
  typescript: {
    declare: false,
    outputFile: path.resolve(dirname, '../../packages/types/src/payload.ts'),
  },
})
