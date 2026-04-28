'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Circle } from '@repo/content/loaders'
import type { CirclesSettings } from '@repo/content/schemas'
import { LogosMark } from '@repo/ui'

import { ROUTES } from '@/constants/routes'
import { Link } from '@/i18n/navigation'

const getMapPosition = (circle: Circle) => {
  const lat = Math.max(-85, Math.min(85, circle.coordinates.lat))
  const latRad = (lat * Math.PI) / 180
  const mercatorY =
    (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2

  return {
    left: `${((circle.coordinates.lng + 180) / 360) * 100}%`,
    top: `${mercatorY * 100}%`,
  }
}

export default function CirclesMap({
  settings,
  circles,
}: {
  settings: CirclesSettings
  circles: Circle[]
}) {
  const [zoom, setZoom] = useState(1)
  const zoomIn = () => setZoom((current) => Math.min(1.8, current + 0.2))
  const zoomOut = () => setZoom((current) => Math.max(1, current - 0.2))

  return (
    <section id="map" className="bg-brand-off-white px-3 pb-3 md:pb-12">
      <div className="relative mx-auto h-[720px] max-w-[369px] overflow-hidden rounded-[100px] bg-gray-01 md:h-[675px] md:max-w-[1416px] md:rounded-[64px]">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          {settings.map.image ? (
            <Image
              src={settings.map.image.src}
              alt={settings.map.image.alt}
              width={settings.map.image.width}
              height={settings.map.image.height}
              className="absolute left-1/2 top-[52%] w-[205%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain md:top-1/2 md:w-[88%]"
              priority
            />
          ) : null}

          {circles.map((circle) => {
            const position = getMapPosition(circle)
            return (
              <Link
                key={circle.slug}
                href={ROUTES.circle(circle.slug)}
                aria-label={circle.name}
                className="group absolute z-10 flex size-[23px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-yellow text-brand-dark-green shadow-sm transition-transform hover:scale-110"
                style={position}
              >
                <LogosMark size={9} />
                <span className="sr-only">{circle.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="absolute right-[33px] top-[47px] z-20 flex flex-col gap-3 md:right-6 md:top-6 md:flex-row">
          <button
            type="button"
            aria-label={settings.map.zoomOutAriaLabel}
            onClick={zoomOut}
            className="flex h-[66px] w-[72px] cursor-pointer items-center justify-center rounded-full bg-brand-dark-green text-brand-off-white transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40 md:size-10"
            disabled={zoom <= 1}
          >
            -
          </button>
          <button
            type="button"
            aria-label={settings.map.zoomInAriaLabel}
            onClick={zoomIn}
            className="flex h-[66px] w-[72px] cursor-pointer items-center justify-center rounded-full bg-brand-dark-green text-brand-off-white transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40 md:size-10"
            disabled={zoom >= 1.8}
          >
            +
          </button>
        </div>
      </div>
    </section>
  )
}
