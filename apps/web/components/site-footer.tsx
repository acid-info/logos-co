/**
 * @figma-node   40009046:22948 (desktop) · 40009046:22697 (mobile)
 *
 * Site-wide footer. Wraps the <Footer> primitive with Logos-specific
 * content and the Lambda icon Logos lockup.
 */
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Footer, LogosMark } from '@repo/ui'

import { EXTERNAL_URLS, ROUTES } from '@/constants/routes'
import { Link } from '@/i18n/navigation'

const MAIN_LINKS = [
  { label: 'Work With Us', href: ROUTES.workWithUs },
  { label: 'Brand Guidelines', href: ROUTES.brandGuidelines },
]

const SOCIAL_LINKS = [
  { label: 'Twitter', href: EXTERNAL_URLS.twitter, external: true },
  { label: 'Discord', href: EXTERNAL_URLS.discord, external: true },
  { label: 'YouTube', href: EXTERNAL_URLS.youtube, external: true },
  { label: 'Blog', href: ROUTES.blog },
  { label: 'Github', href: EXTERNAL_URLS.github, external: true },
]

const RESEARCH_LINKS = [
  { label: 'VacP2P', href: EXTERNAL_URLS.vacp2p, external: true },
]

const INFRASTRUCTURE_LINKS = [
  { label: 'Waku', href: EXTERNAL_URLS.waku, external: true },
  { label: 'Nimbus', href: EXTERNAL_URLS.nimbus, external: true },
  { label: 'Codex', href: EXTERNAL_URLS.codex, external: true },
  { label: 'Nomos', href: EXTERNAL_URLS.nomos, external: true },
]

const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: ROUTES.terms },
  { label: 'Privacy Policy', href: ROUTES.privacy },
  { label: 'Security', href: ROUTES.security },
]

function LogosLockup() {
  return (
    <span className="inline-flex items-center gap-2 text-brand-off-white">
      <LogosMark size={15} className="shrink-0" />
      <span className="font-display text-[18px] leading-none">Logos</span>
    </span>
  )
}

export default async function SiteFooter() {
  const t = await getTranslations('footer')
  return (
    <Footer
      image={
        <Image
          src="/images/home/footer-image.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 83px, 226px"
        />
      }
      logo={<LogosLockup />}
      tagline={t('tagline')}
      mainLinks={MAIN_LINKS}
      socialLinks={SOCIAL_LINKS}
      researchLinks={RESEARCH_LINKS}
      infrastructureLinks={INFRASTRUCTURE_LINKS}
      legalLinks={LEGAL_LINKS}
      builtBy={{
        label: t('builtBy'),
        attribution: 'IFT',
        href: EXTERNAL_URLS.ift,
      }}
      linkAs={Link}
    />
  )
}
