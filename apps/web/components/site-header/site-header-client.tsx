'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

import {
  LogosMark,
  NavOverlay,
  type NavOverlayCommunityCard,
  type NavOverlayLink,
  type NavOverlayPressItem,
} from '@repo/ui'

import { ROUTES } from '@/constants/routes'
import { Link, usePathname } from '@/i18n/navigation'

type ClosedBarLabels = {
  brandLabel: string
  menuLabel: string
  closeLabel: string
  openAriaLabel: string
  closeAriaLabel: string
}

type Props = {
  closedBar: ClosedBarLabels
  sitemap: NavOverlayLink[]
  community: NavOverlayCommunityCard[]
  press: NavOverlayPressItem[]
  pressSeeAllHref: string
}

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

function LambdaGlyph({ className }: { className?: string }) {
  return <LogosMark size={14} className={clsx('shrink-0', className)} />
}

export default function SiteHeaderClient({
  closedBar,
  sitemap,
  community,
  press,
  pressSeeAllHref,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasPassedHero, setHasPassedHero] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === ROUTES.home
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isHome) {
      setHasPassedHero(false)
      return
    }

    const syncHeaderColor = () => {
      setHasPassedHero(window.scrollY >= window.innerHeight)
    }

    syncHeaderColor()
    window.addEventListener('scroll', syncHeaderColor, { passive: true })
    window.addEventListener('resize', syncHeaderColor)

    return () => {
      window.removeEventListener('scroll', syncHeaderColor)
      window.removeEventListener('resize', syncHeaderColor)
    }
  }, [isHome])

  const headerToneClass = isHome
    ? hasPassedHero
      ? 'text-black'
      : 'text-white'
    : 'text-brand-dark-green'

  return (
    <>
      {/* Closed nav bar — fixed, sits above page content */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div
          className={clsx(
            'grid h-10 grid-cols-3 items-center px-3 transition-colors duration-300',
            headerToneClass,
          )}
        >
          <a
            href={ROUTES.home}
            className="text-eyebrow w-fit cursor-pointer tracking-[0.12em] transition-opacity hover:opacity-70"
          >
            {closedBar.brandLabel}
          </a>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={open}
              aria-expanded={isOpen}
              aria-label={closedBar.openAriaLabel}
              className="text-eyebrow inline-flex cursor-pointer items-center gap-1.5 tracking-[0.08em] transition-opacity hover:opacity-70"
            >
              {closedBar.menuLabel} <HamburgerIcon />
            </button>
          </div>

          <div className="flex justify-end">
            <LambdaGlyph className={headerToneClass} />
          </div>
        </div>
      </header>

      {/* Full-screen overlay — shared primitive from @repo/ui */}
      <NavOverlay
        isOpen={isOpen}
        onClose={close}
        sitemap={sitemap}
        community={community}
        press={press}
        pressSeeAllHref={pressSeeAllHref}
        labels={{ closeMenu: closedBar.closeAriaLabel }}
        linkAs={Link}
      />
    </>
  )
}
