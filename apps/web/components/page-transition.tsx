'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { usePathname, useRouter } from '@/i18n/navigation'

type Props = {
  children: ReactNode
}

const PAGE_TRANSITION_EASE = [0.65, 0, 0.35, 1] as const
const COVER_IN_MS = 560

export default function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [isCovered, setIsCovered] = useState(false)
  const isNavigatingRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isNavigatingRef.current) return

    window.requestAnimationFrame(() => {
      isNavigatingRef.current = false
      setIsCovered(false)
    })
  }, [pathname])

  useEffect(() => {
    if (shouldReduceMotion) return

    const shouldIgnoreClick = (
      event: MouseEvent,
      anchor: HTMLAnchorElement
    ) => {
      if (event.defaultPrevented) return true
      if (event.button !== 0) return true
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return true
      }
      if (anchor.target && anchor.target !== '_self') return true
      if (anchor.hasAttribute('download')) return true

      const nextUrl = new URL(anchor.href, window.location.href)
      const currentUrl = new URL(window.location.href)
      if (nextUrl.origin !== currentUrl.origin) return true
      if (
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search
      ) {
        return true
      }

      return false
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (shouldIgnoreClick(event, anchor)) return

      event.preventDefault()
      window.dispatchEvent(new CustomEvent('logos:navigation-start'))
      isNavigatingRef.current = true
      setIsCovered(true)

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      const nextUrl = new URL(anchor.href, window.location.href)
      timeoutRef.current = window.setTimeout(() => {
        router.push(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
      }, COVER_IN_MS)
    }

    document.addEventListener('click', handleDocumentClick, true)

    return () => {
      document.removeEventListener('click', handleDocumentClick, true)
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [router, shouldReduceMotion])

  return (
    <>
      {children}
      <motion.div
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-brand-off-white ${
          isCovered ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={false}
        animate={{ opacity: isCovered ? 1 : 0 }}
        transition={{
          opacity: {
            duration: isCovered ? COVER_IN_MS / 1000 : 0.72,
            ease: PAGE_TRANSITION_EASE,
          },
        }}
        style={{ willChange: 'opacity' }}
      />
    </>
  )
}
