/**
 * App-level Card wrapper that pre-binds next-intl's `Link` to the `@acid-info/logos-ui`
 * Card primitive's CTA so locale-aware navigation is preserved.
 */
import { Card as UICard } from '@acid-info/logos-ui'
import type { ComponentProps } from 'react'

import { Link } from '@/i18n/navigation'

type CardProps = ComponentProps<typeof UICard>

export function Card(props: CardProps) {
  return <UICard linkAs={Link} {...props} />
}
