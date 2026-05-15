/**
 * @figma-path   CTA / Button
 * @figma-node   1022:6225 (variants frame) · 1022:6224 (Primary) ·
 *               1090:4992 (Secondary) · 1502:13352 (Tertiary) · 1022:6223 (Link)
 * @figma-source internal-copy
 * @figma-ref    see docs/figma-trace.yaml
 *
 * Four visual variants:
 *   primary    — filled (dark-green bg, off-white label) + arrow
 *   secondary  — outlined (50% dark-green border, dark-green label) + arrow
 *   tertiary   — ghost (no bg/border, dark-green label) + arrow
 *   link       — underlined label, no icon
 *
 * Renders <a> when `href` is provided, otherwise <button>.
 */
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
  SVGAttributes,
} from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link'

/**
 * A component accepted in place of a raw `<a>` (e.g. next-intl's `Link`).
 * Must accept the anchor attributes the primitive forwards. Pass `'a'` to
 * render a native anchor.
 */
export type LinkLikeComponent =
  | 'a'
  | ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>

type CommonProps = {
  /** Button label — auto-uppercased via CSS. */
  children: ReactNode
  variant?: ButtonVariant
  /**
   * Icon to render to the right of the label. Defaults to a right-arrow for
   * primary / secondary / tertiary; omitted for link. Pass `false` to hide,
   * or a ReactNode to override.
   */
  icon?: ReactNode | false
  className?: string
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
    /** Override the anchor element (e.g. pass next-intl's `Link`). Defaults to `'a'`. */
    linkAs?: LinkLikeComponent
  }

type ButtonElementProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
  }

export type ButtonProps = AnchorProps | ButtonElementProps

export function ButtonArrowIcon({
  className,
  ...props
}: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={`size-[15px] shrink-0 stroke-current ${className ?? ''}`}
      fill="none"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.5 7.5H11.5M11.5 7.5L8 4M11.5 7.5L8 11"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

const containerByVariant: Record<ButtonVariant, string> = {
  primary:
    'inline-flex items-center justify-center rounded-xl bg-brand-dark-green px-3 py-2 text-brand-off-white backdrop-blur-[5px]',
  secondary:
    'inline-flex items-center justify-center rounded-[4px] border border-brand-dark-green/50 px-3 py-2 text-brand-dark-green',
  tertiary:
    'inline-flex items-center justify-center rounded-[4px] text-brand-dark-green',
  link: 'inline-flex items-center justify-center text-brand-dark-green',
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', icon, className, ...rest } = props

  const resolvedIcon =
    icon === false ? null : icon !== undefined ? (
      icon
    ) : variant === 'link' ? null : (
      <ButtonArrowIcon />
    )

  const isLink = variant === 'link'
  const labelClass = `font-mono text-[10px] leading-[1.35] font-semibold uppercase whitespace-nowrap ${
    isLink ? 'border-b border-brand-dark-green/50 pb-[2px]' : ''
  }`

  const content = (
    <span className="inline-flex items-center gap-1">
      <span className={labelClass}>{children}</span>
      {resolvedIcon}
    </span>
  )

  const classes = twMerge(containerByVariant[variant], className)

  if ('href' in rest && rest.href !== undefined) {
    const { href, linkAs: LinkAs = 'a', ...anchorRest } = rest as AnchorProps
    return (
      <LinkAs href={href} className={classes} {...anchorRest}>
        {content}
      </LinkAs>
    )
  }

  const { type = 'button', ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
