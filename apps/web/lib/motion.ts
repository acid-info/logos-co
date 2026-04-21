/**
 * Shared framer-motion variants and easing tokens.
 *
 * Usage:
 *   import { fadeUp, stagger, EASE } from '@/lib/motion'
 *   <motion.div initial="hidden" animate="visible" variants={stagger}>
 *     <motion.span variants={fadeUp}>...</motion.span>
 *   </motion.div>
 */
import type { Transition, Variants } from 'motion/react'

// ---------------------------------------------------------------------------
// Easing & duration tokens
// ---------------------------------------------------------------------------

/** Custom cubic-bezier curves. Match the feel of Figma's default easings. */
export const EASE = {
  /** ease-out-expo — crisp, used for hero headlines and reveals. */
  out: [0.22, 1, 0.36, 1] as const,
  /** ease-in-out-quart — for longer scroll-linked transitions. */
  inOut: [0.83, 0, 0.17, 1] as const,
  /** ease-out-back — subtle overshoot for CTA entrances. */
  back: [0.34, 1.56, 0.64, 1] as const,
}

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  hero: 1.0,
} as const

const baseOut: Transition = { duration: DURATION.base, ease: EASE.out }
const heroOut: Transition = { duration: DURATION.hero, ease: EASE.out }

// ---------------------------------------------------------------------------
// Primitive variants
// ---------------------------------------------------------------------------

/** Simple fade + 20px slide-up. Default for body copy, cards, eyebrows. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: baseOut },
}

/** Larger 40px slide-up. For hero headlines and big display text. */
export const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: heroOut },
}

/** Fade only — no translate. For images and backgrounds. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseOut },
}

/** Scale-in from 95% + fade. For feature cards revealing on scroll. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: baseOut },
}

// ---------------------------------------------------------------------------
// Stagger containers
// ---------------------------------------------------------------------------

/** Parent that staggers children 80 ms apart. Pair with `fadeUp` / `heroFadeUp`. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

/** Slower stagger for word-by-word hero headline reveals. */
export const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

// ---------------------------------------------------------------------------
// Viewport defaults for whileInView
// ---------------------------------------------------------------------------

/** Default viewport config: once per element, trigger when 30% in view. */
export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const

/** More forgiving viewport for tall sections — triggers at 15% visibility. */
export const VIEWPORT_TALL = { once: true, amount: 0.15 } as const
