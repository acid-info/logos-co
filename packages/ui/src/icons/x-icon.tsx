/**
 * Close × icon.
 *
 * Uses `fill="currentColor"` — control color via parent text color.
 * Original viewBox 15×15 (square).
 */
import type { CSSProperties, HTMLAttributes } from 'react'

type XIconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'> & {
  /** Uniform pixel size (width = height). Default 10. */
  size?: number
  style?: CSSProperties
}

export function XIcon({ size = 10, className, style, ...rest }: XIconProps) {
  const maskStyle = {
    width: size,
    height: size,
    mask: 'url(/icons/x.svg) center / contain no-repeat',
    WebkitMask: 'url(/icons/x.svg) center / contain no-repeat',
    ...style,
  } satisfies CSSProperties

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className ?? ''}`}
      style={maskStyle}
      {...rest}
    />
  )
}
