import type { CSSProperties } from 'react'

type IconMaskProps = {
  src: string
  className?: string
}

export function IconMask({ src, className }: IconMaskProps) {
  const style = {
    mask: `url(${src}) center / contain no-repeat`,
    WebkitMask: `url(${src}) center / contain no-repeat`,
  } satisfies CSSProperties

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className ?? ''}`}
      style={style}
    />
  )
}
