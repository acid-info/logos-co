/**
 * Close × icon.
 *
 * Uses `fill="currentColor"` — control color via parent text color.
 * Original viewBox 15×15 (square).
 */
import type { SVGProps } from 'react'

type XIconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'fill'> & {
  /** Uniform pixel size (width = height). Default 10. */
  size?: number
}

export function XIcon({ size = 10, className, ...rest }: XIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M7.50041 6.5097L10.8944 3.11572L11.8846 4.10595L8.49064 7.49992L11.8846 10.8939L10.8944 11.8841L7.50041 8.49015L4.10644 11.8841L3.11621 10.8939L6.51019 7.49992L3.11621 4.10595L4.10644 3.11572L7.50041 6.5097Z" />
    </svg>
  )
}
