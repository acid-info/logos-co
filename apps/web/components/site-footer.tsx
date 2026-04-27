/**
 * @figma-node   40009046:22948 (desktop) · 40009046:22697 (mobile)
 *
 * Site-wide footer. Wraps the <Footer> primitive with Logos-specific
 * content sourced from `content/site/<locale>/footer.json` via
 * `@repo/content`.
 */
import Image from 'next/image'
import { getLocale } from 'next-intl/server'
import { Footer, LogosMark } from '@repo/ui'
import { getFooter } from '@repo/content/loaders'
import { isActiveLocale } from '@repo/content/locales'

import { Link } from '@/i18n/navigation'

function LogosLockup() {
  return (
    <span className="inline-flex items-center gap-2 text-brand-off-white">
      <LogosMark size={15} className="shrink-0" />
      <span className="font-display text-[18px] leading-none">Logos</span>
    </span>
  )
}

export default async function SiteFooter() {
  const rawLocale = await getLocale()
  if (!isActiveLocale(rawLocale)) {
    throw new Error(`SiteFooter received non-active locale "${rawLocale}"`)
  }
  const footer = await getFooter(rawLocale)

  return (
    <Footer
      image={
        <Image
          src={footer.image.src}
          alt={footer.image.alt}
          fill
          sizes="(max-width: 768px) 83px, 226px"
        />
      }
      logo={<LogosLockup />}
      tagline={footer.tagline}
      mainLinks={footer.mainLinks}
      socialLinks={footer.socialLinks}
      researchLinks={footer.researchLinks}
      infrastructureLinks={footer.infrastructureLinks}
      legalLinks={footer.legalLinks}
      builtBy={{
        label: footer.builtBy.label,
        attribution: footer.builtBy.attribution,
        href: footer.builtBy.href,
      }}
      linkAs={Link}
    />
  )
}
