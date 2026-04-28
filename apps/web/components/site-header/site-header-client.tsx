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
    <span
      aria-hidden="true"
      className="size-[15px] shrink-0 bg-current"
      style={{
        mask: 'url(/icons/hamburger-menu.svg) center / contain no-repeat',
        WebkitMask: 'url(/icons/hamburger-menu.svg) center / contain no-repeat',
      }}
    />
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

  const usesHeroHeaderTone =
    pathname === ROUTES.home || pathname === ROUTES.book
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    window.addEventListener('logos:navigation-start', close)
    return () => {
      window.removeEventListener('logos:navigation-start', close)
    }
  }, [])

  useEffect(() => {
    if (!usesHeroHeaderTone) {
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
  }, [usesHeroHeaderTone])

  const headerToneClass = usesHeroHeaderTone
    ? hasPassedHero
      ? 'text-black'
      : 'text-white'
    : 'text-brand-dark-green'

  return (
    <>
      {/* Closed nav bar. Hero pages keep the overlay treatment; regular pages
          reserve the 40px nav height so content starts below the bar. */}
      <header
        className={clsx(
          'left-0 right-0 top-0 z-50',
          usesHeroHeaderTone ? 'fixed' : 'sticky'
        )}
      >
        <div
          className={clsx(
            'grid h-10 grid-cols-3 items-center px-3 transition-colors duration-300',
            headerToneClass
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
              className="text-eyebrow -mx-3 inline-flex min-h-10 cursor-pointer items-center gap-1.5 px-3 tracking-[0.08em] transition-opacity hover:opacity-70"
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
