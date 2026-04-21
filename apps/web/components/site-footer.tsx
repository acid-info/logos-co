/**
 * @figma-node   40009046:22948 (desktop) · 40009046:22697 (mobile)
 *
 * Site-wide footer. Wraps the <Footer> primitive with Logos-specific
 * content and the λ Logos lockup.
 */
import Image from 'next/image'
import { Footer, LogosMark } from '@repo/ui'

import { EXTERNAL_URLS, ROUTES } from '@/constants/routes'

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

const RESEARCH_LINKS = [{ label: 'VacP2P', href: EXTERNAL_URLS.vacp2p, external: true }]

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

export default function SiteFooter() {
  return (
    <Footer
      image={
        <Image
          src="/temp/footer-image.png"
          alt=""
          fill
          sizes="(max-width: 768px) 83px, 226px"
        />
      }
      logo={<LogosLockup />}
      tagline="Pioneering a new era of freedom."
      mainLinks={MAIN_LINKS}
      socialLinks={SOCIAL_LINKS}
      researchLinks={RESEARCH_LINKS}
      infrastructureLinks={INFRASTRUCTURE_LINKS}
      legalLinks={LEGAL_LINKS}
      builtBy={{ label: 'Built by', attribution: 'IFT', href: EXTERNAL_URLS.ift }}
    />
  )
}
