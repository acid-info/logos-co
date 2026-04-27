import { LogosMark } from '@repo/ui'

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
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15 15"
      className="size-3.75 shrink-0"
      fill="none"
    >
      <path
        d="M7.5 2v8m0 0L4.5 7m3 3L10.5 7M3 12.5h9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
