import type { ZodTypeAny, infer as zInfer } from 'zod'

import { assertActiveLocale } from '../locales/registry.js'
import {
  type CustomSection,
  type Language,
  type PageCopy,
  getCustomSectionSchema,
  pageCopySchema,
} from '../schemas/index.js'

import { contentPath, readJson } from './_fs.js'

const PAGES_DIR = 'pages'

/**
 * Map an internal route to its content file slug.
 *
 *   `/`                         → `home`
 *   `/builders-hub`             → `builders-hub`
 *   `/technology-stack/storage` → `technology-stack-storage`
 */
export const routeToPageSlug = (route: string): string => {
  const trimmed = route.replace(/^\/+/, '').replace(/\/+$/, '')
  if (trimmed === '') return 'home'
  return trimmed.replace(/\//g, '-')
}

const validateAndNarrowCustomSections = (page: PageCopy, filePath: string): void => {
  for (const section of page.sections) {
    if (section.componentType !== 'custom') continue
    const schema = getCustomSectionSchema(section.customSchemaId)
    if (!schema) {
      throw new Error(
        `unknown customSchemaId "${section.customSchemaId}" at ${filePath} (section "${section.key}"); register it via registerCustomSection() before loading the page`,
      )
    }
    const result = schema.safeParse(section.payload)
    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`)
        .join('; ')
      throw new Error(
        `custom section payload validation failed at ${filePath} (section "${section.key}", schema "${section.customSchemaId}"): ${issues}`,
      )
    }
    section.payload = result.data
  }
}

export const getPageCopy = async (route: string, locale: Language): Promise<PageCopy> => {
  assertActiveLocale(locale)
  const slug = routeToPageSlug(route)
  const filePath = contentPath(PAGES_DIR, locale, `${slug}.json`)
  const page = await readJson(filePath, pageCopySchema)
  if (page.route !== route) {
    throw new Error(
      `page route mismatch at ${filePath}: loader called with "${route}" but file declares "${page.route}"`,
    )
  }
  validateAndNarrowCustomSections(page, filePath)
  return page
}

/**
 * Type helper for callers that own a custom-section schema. Validates and
 * returns the typed payload — pair with `registerCustomSection(id, schema)`
 * at app bootstrap so `getPageCopy` does not throw on the same content.
 */
export const parseCustomSectionPayload = <S extends ZodTypeAny>(
  section: CustomSection,
  schema: S,
): zInfer<S> => schema.parse(section.payload)
