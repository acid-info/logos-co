/**
 * @figma-node  40009046:23459 (Nav section — closed + open)
 *              40009046:23458 (D2 Nav instance — bar)
 *              40009046:23534 (open desktop, 1440)
 *              40009046:23460 (open mobile, 393)
 *
 * Site header = fixed 40px top bar + <NavOverlay> (dialog from @repo/ui).
 * The overlay is a shared primitive — this file only owns the closed-state
 * bar and the Logos-specific nav data (sitemap, community cards, press).
 */
'use client'

import { useState } from 'react'
import Image from 'next/image'

import { LogosMark, NavOverlay } from '@repo/ui'
import type {
  NavOverlayCommunityCard,
  NavOverlayLink,
  NavOverlayPressItem,
} from '@repo/ui'

import { ROUTES } from '@/constants/routes'

// ---------------------------------------------------------------------------
// Static nav data — press items are placeholders until CMS is wired up
// ---------------------------------------------------------------------------

const SITEMAP: NavOverlayLink[] = [
  { label: 'Technology Stack', href: ROUTES.technologyStack },
  { label: 'Take Action', href: ROUTES.takeAction },
  { label: 'Logos Circles', href: ROUTES.circles },
  { label: 'Book', href: ROUTES.book },
  { label: 'Links', href: ROUTES.links },
]

const COMMUNITY: NavOverlayCommunityCard[] = [
  {
    label: 'Build',
    href: ROUTES.buildersHub,
    description:
      'Everything you need to start building privacy-first decentralized applications. Explore ideas, find bounties, and connect with others.',
    image: (
      <Image
        src="/nav-overlay/build.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    ),
  },
  {
    label: 'Node Program',
    href: ROUTES.nodeProgram,
    description:
      'The Node Program is for anyone who wants to join our movement to revitalize civil society using decentralized technologies.',
    image: (
      <Image
        src="/nav-overlay/node-program.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    ),
  },
  {
    label: 'Circles',
    href: ROUTES.circles,
    description:
      'Local chapters are at the heart of our movement. Learn civil organizing, share skills, and forge new connections.',
    image: (
      <Image
        src="/nav-overlay/circles.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    ),
  },
]

const PRESS_ITEMS: NavOverlayPressItem[] = [
  {
    date: '02.14.26',
    headline: 'Story of the Network: From CyberNetics to Blockchain Communities',
    href: '#',
    image: <Image src="/nav-overlay/press-1.png" alt="" fill sizes="160px" />,
  },
  {
    date: '02.14.26',
    headline: 'Story of the Network: From CyberNetics to Blockchain Communities',
    href: '#',
    image: <Image src="/nav-overlay/press-2.png" alt="" fill sizes="160px" />,
  },
  {
    date: '02.14.26',
    headline: 'Story of the Network: From CyberNetics to Blockchain Communities',
    href: '#',
    image: <Image src="/nav-overlay/press-3.png" alt="" fill sizes="160px" />,
  },
  {
    date: '02.14.26',
    headline: 'Story of the Network: From CyberNetics to Blockchain Communities',
    href: '#',
    image: <Image src="/nav-overlay/press-4.png" alt="" fill sizes="160px" />,
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function HamburgerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 10"
      className="h-2.25 w-3.25 shrink-0"
      fill="none"
    >
      <path
        d="M0 1h14M0 5h14M0 9h14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  )
}

function LambdaGlyph() {
  return <LogosMark size={14} className="shrink-0 text-brand-dark-green" />
}

// ---------------------------------------------------------------------------
// SiteHeader
// ---------------------------------------------------------------------------

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      {/* Closed nav bar — fixed, sits above page content */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="grid h-10 grid-cols-3 items-center px-3 text-brand-dark-green">
          <a
            href={ROUTES.home}
            className="text-eyebrow cursor-pointer tracking-[0.12em] transition-opacity hover:opacity-70"
          >
            LOGOS
          </a>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={open}
              aria-expanded={false}
              aria-label="Open navigation menu"
              className="text-eyebrow inline-flex cursor-pointer items-center gap-1.5 tracking-[0.08em] transition-opacity hover:opacity-70"
            >
              MENU <HamburgerIcon />
            </button>
          </div>

          <div className="flex justify-end">
            <LambdaGlyph />
          </div>
        </div>
      </header>

      {/* Full-screen overlay — shared primitive from @repo/ui */}
      <NavOverlay
        isOpen={isOpen}
        onClose={close}
        sitemap={SITEMAP}
        community={COMMUNITY}
        press={PRESS_ITEMS}
        pressSeeAllHref={ROUTES.press}
      />
    </>
  )
}
