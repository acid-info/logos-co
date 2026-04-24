import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

type FeatureCardProps = {
  title: string
  body: string
  dotClassName: string
  imageSrc: string
}

function FeatureCard({
  title,
  body,
  dotClassName,
  imageSrc,
}: FeatureCardProps) {
  return (
    <div className="flex flex-1 flex-col items-start justify-between gap-3 rounded-3xl bg-gray-01 p-1.5">
      <div className="flex w-full flex-col gap-3 p-3">
        <div className="flex items-center gap-3">
          <span
            className={`h-3 w-[18px] shrink-0 rounded-full ${dotClassName}`}
            aria-hidden="true"
          />
          <p className="text-body-sans whitespace-nowrap text-brand-dark-green">
            {title}
          </p>
        </div>
        <p className="text-mono-s text-brand-dark-green">{body}</p>
      </div>
      <div className="relative h-62 w-full overflow-hidden rounded-[18px]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default async function NetworkingFeatures() {
  const t = await getTranslations('pages.networking.features')

  const cards: FeatureCardProps[] = [
    {
      title: t('mixNetTitle'),
      body: t('mixNetBody'),
      dotClassName: 'bg-accent-light-blue',
      imageSrc: '/images/networking/mix-net.jpg',
    },
    {
      title: t('capabilityTitle'),
      body: t('capabilityBody'),
      dotClassName: 'bg-brand-yellow',
      imageSrc: '/images/networking/capability-discovery.jpg',
    },
    {
      title: t('peeringTitle'),
      body: t('peeringBody'),
      dotClassName: 'bg-accent-steel-teal',
      imageSrc: '/images/networking/peering-layer.jpg',
    },
  ]

  return (
    <section className="bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3 pt-3 pb-3 md:pt-[100px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          {cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
