import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

/**
 * About ATF — full-bleed mountain photo with hero display title overlaid.
 *
 * Figma desktop 40009046:27249 (h 800), mobile 40009046:27110 (matching ATF).
 */
export async function AboutHero() {
  const t = await getTranslations('pages.about.hero')

  return (
    <section className="relative h-[800px] w-full overflow-hidden">
      <Image
        src="/images/about/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <h1 className="text-hero absolute inset-x-0 top-[283px] mx-auto max-w-[369px] px-3 text-center text-brand-off-white md:max-w-none">
        {t('title')}
      </h1>
    </section>
  )
}
