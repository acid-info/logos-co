/**
 * App-level Button wrapper that pre-binds next-intl's `Link` to the `@acid-info/logos-ui`
 * Button primitive. Use this in apps/web wherever an internal route is linked
 * so locale-aware navigation is preserved.
 */
import { Button as UIButton, type ButtonProps } from '@acid-info/logos-ui'

import { Link } from '@/i18n/navigation'

export { ButtonArrowIcon } from '@acid-info/logos-ui'
export type { ButtonProps, ButtonVariant } from '@acid-info/logos-ui'

export function Button(props: ButtonProps) {
  if ('href' in props && props.href !== undefined) {
    return <UIButton linkAs={Link} {...props} />
  }
  return <UIButton {...props} />
}
