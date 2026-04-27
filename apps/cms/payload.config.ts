import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Pages } from './src/collections/Pages'
import { Users } from './src/collections/Users'
import { SiteSettings } from './src/globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === 'production'

// Server URL — explicit env wins; on Vercel fall back to the auto-injected
// `VERCEL_URL` (preview URLs change per deploy). Local dev defaults to
// localhost:3001.
const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001')

const frontendURL =
  process.env.NEXT_PUBLIC_WEB_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

// Database — Postgres (Supabase / Neon / Vercel Postgres). The schema name
// scopes Payload tables under a dedicated namespace, so coexisting with other
// apps that share the same database is safe.
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is required (postgresql:// connection string). ' +
      'For local dev copy apps/cms/.env.example to apps/cms/.env and fill it in.',
  )
}

const payloadSecret = process.env.PAYLOAD_SECRET
if (isProduction && !payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required in production')
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Pages],
  cors: [serverURL, frontendURL],
  csrf: [serverURL, frontendURL],
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
    // Isolate Payload tables from any other app sharing the database.
    schemaName: process.env.PAYLOAD_DB_SCHEMA || 'payload',
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings],
  secret: payloadSecret || 'dev-only-insecure-secret',
  serverURL,
  typescript: {
    declare: false,
    outputFile: path.resolve(dirname, '../../packages/types/src/payload.ts'),
  },
})
