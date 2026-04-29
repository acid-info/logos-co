'use client'

import dynamic from 'next/dynamic'

import type { CircleEvent } from '@/lib/circle-events'

// Leaflet relies on `window`/`document` at module evaluation, so the
// heavy map module must be excluded from server-side rendering. With
// `output: 'export'`, this means the map is hydrated only in the
// browser; the placeholder below is what's baked into the static HTML.
const CirclesMap = dynamic(() => import('./circles-map'), {
  ssr: false,
  loading: () => (
    <div className="text-mono-s text-brand-dark-green/60 flex h-full w-full items-center justify-center bg-gray-01">
      Loading map…
    </div>
  ),
})

type Props = {
  events: CircleEvent[]
}

export default function CirclesMapLoader({ events }: Props) {
  return <CirclesMap events={events} />
}
