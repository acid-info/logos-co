/**
 * Public-asset paths for downloadable book editions.
 *
 * Centralised so a renamed PDF or new translation only needs editing here,
 * not the page that links to it. Files live under `apps/web/public/book/`.
 */
export const BOOK_DOWNLOADS = {
  fossEditionEn: '/book/farewell-to-westphalia-foss-edition.pdf',
  spanish: '/book/farewell-to-westphalia-spanish.pdf',
} as const

export type BookDownloadKey = keyof typeof BOOK_DOWNLOADS
