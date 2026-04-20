import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { clsx } from 'clsx'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition',
        variant === 'primary' &&
          'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200',
        variant === 'secondary' &&
          'border border-black/10 bg-white text-black hover:border-black/20 hover:bg-neutral-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
