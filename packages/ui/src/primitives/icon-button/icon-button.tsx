import type { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonVariant = 'solid' | 'outline'
type IconButtonSize = 'sm' | 'lg'

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className'
> & {
  children: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  className?: string
}

export function IconButton({
  children,
  variant = 'solid',
  size = 'lg',
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  const sizeClass = size === 'sm' ? 'size-10' : 'size-16'
  const variantClass =
    variant === 'outline'
      ? 'border border-brand-dark-green/15 text-brand-dark-green hover:bg-brand-dark-green hover:text-brand-off-white'
      : 'bg-brand-dark-green text-brand-off-white hover:opacity-80'

  return (
    <button
      type={type}
      className={`inline-flex ${sizeClass} items-center justify-center rounded-full transition-all ${variantClass} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
