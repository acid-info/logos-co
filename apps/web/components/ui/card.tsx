/**
 * App-level Card wrapper that pre-binds next-intl's `Link` to the `@repo/ui`
 * Card primitive's CTA so locale-aware navigation is preserved.
 */
import { Card as UICard } from '@repo/ui'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'

type CardProps = ComponentProps<typeof UICard>

export function Card(props: CardProps) {
  return <UICard linkAs={Link} {...props} />
}
