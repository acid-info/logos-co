/**
 * App-level Button wrapper that pre-binds next-intl's `Link` to the `@repo/ui`
 * Button primitive. Use this in apps/web wherever an internal route is linked
 * so locale-aware navigation is preserved.
 */
import { Button as UIButton, type ButtonProps } from '@repo/ui'

import { Link } from '@/i18n/navigation'

export { ButtonArrowIcon } from '@repo/ui'
export type { ButtonProps, ButtonVariant } from '@repo/ui'

export function Button(props: ButtonProps) {
  if ('href' in props && props.href !== undefined) {
    return <UIButton linkAs={Link} {...props} />
  }
  return <UIButton {...props} />
}
