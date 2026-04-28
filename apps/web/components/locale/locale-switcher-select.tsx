'use client'

import { ChangeEvent, ReactNode, useTransition } from 'react'
import { usePathname } from '@/i18n/navigation'
import clsx from 'clsx'
import { Locale } from 'next-intl'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    startTransition(() => {
      window.location.pathname = `/${nextLocale}${pathname}`
    })
  }

  return (
    <div className="relative inline-block w-24">
      <select
        className={clsx(
          'text-foreground w-full appearance-none border border-black px-3 py-1 text-sm dark:border-white',
          'cursor-pointer',
          isPending && 'transition-opacity [&:disabled]:opacity-30'
        )}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        <optgroup label="Language">{children}</optgroup>
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 bg-gray-500"
        style={{
          mask: 'url(/icons/chevron-down.svg) center / contain no-repeat',
          WebkitMask: 'url(/icons/chevron-down.svg) center / contain no-repeat',
        }}
      />
    </div>
  )
}
