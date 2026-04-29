/**
 * Lambda icon Logos brand mark.
 *
 * Uses `fill="currentColor"` so color is driven by the surrounding
 * text color (`text-brand-dark-green`, `text-brand-off-white`, etc.) —
 * no separate black/white variants needed.
 *
 * Original viewBox is 20×26 (aspect ratio ≈ 0.769).
 * Default render size is 14px tall (≈ 11×14). Pass `size` to scale
 * uniformly, or override `width` / `height` individually.
 */
import type { CSSProperties, HTMLAttributes } from 'react'

type LogosMarkProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'> & {
  /** Height in px. Width is derived from the native aspect ratio. Default 14. */
  size?: number
  width?: number | string
  height?: number | string
  style?: CSSProperties
}

export function LogosMark({
  size = 14,
  width,
  height,
  className,
  style,
  ...rest
}: LogosMarkProps) {
  const computedHeight = height ?? size
  const computedWidth =
    width ??
    (typeof computedHeight === 'number'
      ? (computedHeight * 20) / 26
      : undefined)

  const maskStyle = {
    width: computedWidth,
    height: computedHeight,
    mask: 'url(/icons/logos-mark.svg) center / contain no-repeat',
    WebkitMask: 'url(/icons/logos-mark.svg) center / contain no-repeat',
    ...style,
  } satisfies CSSProperties

  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className ?? ''}`}
      style={maskStyle}
      {...rest}
    />
  )
}
