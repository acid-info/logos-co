/**
 * @figma-node   40009046:23459 (Nav section — closed + open)
 *               40009046:23534 (open desktop, 1440)
 *               40009046:23460 (open mobile, 393)
 *
 * Full-screen hamburger-menu dialog. Rendered when the user clicks "MENU"
 * in the fixed top bar. Self-contains its own top strip (LOGOS · CLOSE
 * MENU × · Lambda icon), body scroll lock, and Escape-key close.
 *
 * Layout:
 *   Desktop (md+): two-col grid — Sitemap (left) · Community + Press (right)
 *   Mobile:        single column stack
 *
 * All section labels (SITEMAP, JOIN OUR COMMUNITY, PRESS, SEE ALL) can be
 * overridden via the `labels` prop for i18n.
 */
'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { LogosMark } from '../../icons/logos-mark'
import { XIcon } from '../../icons/x-icon'
import type { LinkLikeComponent } from '../button/button'

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type NavOverlayLink = {
  label: string
  href: string
}

export type NavOverlayCommunityCard = {
  label: string
  description: string
  href: string
  /** Optional background image — rendered behind the card content. */
  image?: ReactNode
}

export type NavOverlayPressItem = {
  date: string
  headline: string
  href: string
  /** Optional thumbnail image — rendered in the aspect-square slot. */
  image?: ReactNode
}

export type NavOverlayLabels = {
  closeMenu?: string
  sitemap?: string
  community?: string
  press?: string
  seeAll?: string
}

export type NavOverlayProps = {
  /** Whether the overlay is shown. */
  isOpen: boolean
  /** Called when the user dismisses the overlay (close button, Escape, link click). */
  onClose: () => void

  /** Lambda icon Logos lockup shown top-left of the overlay. */
  logo?: ReactNode
  /** href for the logo. Defaults to `/`. */
  logoHref?: string

  /** Sitemap link list (required). */
  sitemap: NavOverlayLink[]
  /** Community cards shown on the right. Optional. */
  community?: NavOverlayCommunityCard[]
  /** Press thumbnail row. Optional. */
  press?: NavOverlayPressItem[]
  /** href for the Press SEE ALL → link. */
  pressSeeAllHref?: string

  /** Section label overrides for i18n. */
  labels?: NavOverlayLabels

  /** Override the anchor element for internal links (e.g. pass next-intl's `Link`). Defaults to `'a'`. */
  linkAs?: LinkLikeComponent

  className?: string
}

// ---------------------------------------------------------------------------
// Internal icons / glyphs
// ---------------------------------------------------------------------------

function LambdaGlyph({ size = 14 }: { size?: number }) {
  return <LogosMark size={size} className="shrink-0" />
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CommunityCard({
  label,
  description,
  href,
  image,
  onClose,
  linkAs: LinkAs = 'a',
}: NavOverlayCommunityCard & {
  onClose: () => void
  linkAs?: LinkLikeComponent
}) {
  return (
    <LinkAs
      href={href}
      onClick={onClose}
      className="group relative flex h-35 cursor-pointer flex-col overflow-hidden rounded-3xl bg-brand-off-white/10 p-4.5 transition-opacity hover:opacity-80 md:h-51.5 md:flex-1"
    >
      {image && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl *:size-full *:object-cover">
          {image}
        </div>
      )}
      {/* Inner content — title top, description bottom (justify-between per Figma) */}
      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div className="flex items-center gap-2.5 text-brand-off-white">
          <LambdaGlyph />
          <span className="font-display text-[18px] leading-[1.1] tracking-[-0.01em]">
            {label}
          </span>
        </div>
        <p className="font-sans text-[12px] font-medium leading-[1.2] text-brand-off-white">
          {description}
        </p>
      </div>
    </LinkAs>
  )
}

function PressCard({
  item,
  onClose,
  linkAs: LinkAs = 'a',
}: {
  item: NavOverlayPressItem
  onClose: () => void
  linkAs?: LinkLikeComponent
}) {
  return (
    <LinkAs
      href={item.href}
      onClick={onClose}
      className="flex w-41.5 shrink-0 cursor-pointer flex-col gap-1.5 transition-opacity hover:opacity-70 md:w-auto"
    >
      {/* Thumbnail — 166×211 portrait per Figma */}
      <div className="relative aspect-166/211 w-full overflow-hidden bg-brand-off-white/10 *:size-full *:object-cover">
        {item.image}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-eyebrow text-brand-off-white">{item.date}</p>
        <p className="font-sans text-[12px] font-medium leading-[1.2] text-brand-off-white line-clamp-3">
          {item.headline}
        </p>
      </div>
    </LinkAs>
  )
}

// ---------------------------------------------------------------------------
// NavOverlay
// ---------------------------------------------------------------------------

export function NavOverlay({
  isOpen,
  onClose,
  logo,
  logoHref = '/',
  sitemap,
  community,
  press,
  pressSeeAllHref = '/press',
  labels,
  linkAs,
  className,
}: NavOverlayProps) {
  const LinkAs: LinkLikeComponent = linkAs ?? 'a'
  const {
    closeMenu = 'CLOSE MENU',
    sitemap: sitemapLabel = 'SITEMAP',
    community: communityLabel = 'JOIN OUR COMMUNITY',
    press: pressLabel = 'PRESS',
    seeAll = 'SEE ALL →',
  } = labels ?? {}

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-brand-dark-green text-brand-off-white ${className ?? ''}`}
    >
      {/* Top bar — LOGOS · CLOSE MENU × · Lambda icon */}
      <div className="grid h-10 grid-cols-3 items-center px-3">
        <LinkAs
          href={logoHref}
          className="text-eyebrow -mx-3 inline-flex min-h-10 cursor-pointer items-center px-3 tracking-[0.12em] transition-opacity hover:opacity-70"
        >
          {logo ?? 'LOGOS'}
        </LinkAs>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="text-eyebrow -mx-3 inline-flex min-h-10 cursor-pointer items-center gap-1.5 px-3 tracking-[0.08em] transition-opacity hover:opacity-70"
          >
            {closeMenu}
            <XIcon size={15} className="shrink-0" />
          </button>
        </div>

        <div className="flex justify-end">
          <LinkAs
            href={logoHref}
            aria-label="LOGOS"
            className="-mx-3 inline-flex min-h-10 cursor-pointer items-center px-3 transition-opacity hover:opacity-70"
          >
            <LambdaGlyph />
          </LinkAs>
        </div>
      </div>

      {/* Divider under top bar */}
      <div className="h-px bg-brand-off-white/20" />

      {/* Content — single col mobile / two col desktop; matches Figma 12 px gutters */}
      <div className="flex flex-1 flex-col gap-6 px-3 pt-6 pb-6 md:grid md:grid-cols-2 md:gap-3 md:px-3 md:pt-6">
        {/* Left — sitemap */}
        <nav aria-label={sitemapLabel}>
          <p className="text-eyebrow mb-6 text-brand-off-white">
            {sitemapLabel}
          </p>
          <ul className="flex flex-col gap-5">
            {sitemap.map((link) => (
              <li key={link.href + link.label}>
                <LinkAs
                  href={link.href}
                  onClick={onClose}
                  className="text-h2 block cursor-pointer text-brand-off-white transition-opacity hover:opacity-60"
                >
                  {link.label}
                </LinkAs>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — community cards + press */}
        <div className="flex flex-col gap-10">
          {community && community.length > 0 && (
            <div>
              <p className="text-eyebrow mb-4 text-brand-off-white">
                {communityLabel}
              </p>
              <div className="flex flex-col gap-3 md:flex-row">
                {community.map((card) => (
                  <CommunityCard
                    key={card.label}
                    {...card}
                    onClose={onClose}
                    linkAs={linkAs}
                  />
                ))}
              </div>
            </div>
          )}

          {press && press.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-eyebrow text-brand-off-white">
                  {pressLabel}
                </p>
                <LinkAs
                  href={pressSeeAllHref}
                  onClick={onClose}
                  className="text-eyebrow inline-flex cursor-pointer items-center gap-1 font-semibold text-brand-off-white transition-opacity hover:opacity-70"
                >
                  {seeAll}
                </LinkAs>
              </div>
              {/* Horizontally scrollable on mobile, 4-up grid on desktop */}
              <div className="-mx-3 flex gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
                {press.map((item, i) => (
                  <PressCard
                    key={i}
                    item={item}
                    onClose={onClose}
                    linkAs={linkAs}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
