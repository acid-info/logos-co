import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { LogosMark } from '@repo/ui'

type StackCardProps = {
  label: ReactNode
  href: string
  className?: string
  labelClassName?: string
}

export function StackCard({
  label,
  href,
  className,
  labelClassName,
}: StackCardProps) {
  return (
    <a
      href={href}
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded-3xl border transition-colors',
        className,
      )}
    >
      <span
        className={twMerge(
          'text-subhead-sans flex items-center gap-2 text-brand-dark-green',
          labelClassName,
        )}
      >
        <LogosMark size={14} className="shrink-0" />
        {label}
      </span>
    </a>
  )
}

type StackRowProps = {
  children: ReactNode
  href?: string
  className?: string
  labelClassName?: string
}

export function StackRow({
  children,
  href,
  className,
  labelClassName,
}: StackRowProps) {
  const containerClasses = twMerge(
    'flex items-center justify-center rounded-3xl border px-6 text-center transition-colors',
    href && 'cursor-pointer',
    className,
  )
  const content = (
    <span
      className={twMerge(
        'text-subhead-sans text-brand-dark-green',
        labelClassName,
      )}
    >
      {children}
    </span>
  )
  if (href) {
    return (
      <a href={href} className={containerClasses}>
        {content}
      </a>
    )
  }
  return <div className={containerClasses}>{content}</div>
}
