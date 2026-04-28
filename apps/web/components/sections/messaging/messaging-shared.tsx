import { LogosMark } from '@repo/ui'

import { IconMask } from '@/components/icons/icon-mask'

export function SectionMarker({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div className={`flex items-start gap-[102px] ${className}`}>
      <LogosMark size={9} className="mt-0 shrink-0 text-brand-dark-green" />
      <p className="text-eyebrow w-46.25 text-brand-dark-green">{label}</p>
    </div>
  )
}

export function DownloadIcon() {
  return <IconMask src="/icons/download.svg" className="size-3.75" />
}
