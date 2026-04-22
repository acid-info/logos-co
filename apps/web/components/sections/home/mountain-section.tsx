import Image from 'next/image'

export default function MountainSection() {
  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-354 px-3">
        {/* Oval-clipped mountain image — 1416×2283px in Figma */}
        <div className="overflow-hidden rounded-[900px]" style={{ aspectRatio: '1416 / 2283' }}>
          <div className="relative h-full w-full">
            <Image
              src="/images/home/mountain-landscape.jpg"
              alt=""
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
