/**
 * @figma-node   40009046:22948 / 40009046:21794 (desktop 1440 × 708)
 *               40009046:22697 (mobile 394 × 711)
 *
 * Site footer. Dark-green bg, off-white text.
 *
 * Desktop (md+): 12-column grid × 4 rows. Three content columns occupy
 * grid columns 1–2, 7–8, and 11–12 — matching Figma's left (x=12),
 * center (x=726) and right (x=1203) anchor points.
 *
 *   Row 1 — image            · λ Logos               · tagline
 *   Row 2 — (empty)          · Work With Us + BG     · Twitter/Discord/…
 *   Row 3 — Built by IFT     · Research + VacP2P     · Infrastructure + Waku/…
 *   Row 4 — (empty)          · Terms/Privacy/Security · (empty)
 *
 * Mobile: 2-column grid. Col 1: image, work-with-us, research, legal.
 *         Col 2: logo+tagline, socials, infrastructure, built-by-IFT.
 */
import type { ReactNode } from 'react'

export type FooterLink = {
  label: string
  href: string
  external?: boolean
}

export type FooterProps = {
  image?: ReactNode
  tagline?: ReactNode
  logo?: ReactNode
  mainLinks: FooterLink[]
  socialLinks: FooterLink[]
  researchLinks: FooterLink[]
  infrastructureLinks: FooterLink[]
  legalLinks: FooterLink[]
  builtBy?: { label: string; attribution: ReactNode; href?: string }
  className?: string
}

function Link({ label, href, external }: FooterLink) {
  const external_ = external || href.startsWith('http')
  return (
    <a
      href={href}
      {...(external_ ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-mono-s text-brand-off-white transition-opacity hover:opacity-70"
    >
      {label}
    </a>
  )
}

function LinkList({
  label,
  links,
}: {
  label?: string
  links: FooterLink[]
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="text-eyebrow mb-1 text-brand-off-white">{label}</p>
      )}
      {links.map((link) => (
        <Link key={link.href} {...link} />
      ))}
    </div>
  )
}

export function Footer({
  image,
  tagline,
  mainLinks,
  socialLinks,
  researchLinks,
  infrastructureLinks,
  legalLinks,
  builtBy,
  logo,
  className,
}: FooterProps) {
  return (
    <footer
      className={`bg-brand-dark-green px-3 pt-6 pb-11 text-brand-off-white md:pt-6 md:pb-11 ${className ?? ''}`}
    >
      <div
        className={[
          // Mobile: 2-col simple grid
          'grid grid-cols-2 gap-x-6 gap-y-44',
          // Desktop: 12-col × 4-row grid, tighter row gaps
          'md:grid-cols-12 md:grid-rows-[auto_auto_auto_auto] md:gap-x-3 md:gap-y-22.5',
        ].join(' ')}
      >
        {/* ------------------------------------------------------------ */}
        {/* Row 1 — brand                                                */}
        {/* ------------------------------------------------------------ */}

        {/* Image — desktop col 1-2 row 1 / mobile col 1 row 1 */}
        <div className="row-start-1 md:col-span-2 md:row-start-1">
          <div className="relative h-11.75 w-20.75 overflow-hidden rounded-sm md:h-31.75 md:w-56.5 *:size-full *:object-cover">
            {image}
          </div>
        </div>

        {/* λ Logos lockup — desktop col 7-8 row 1 / mobile col 2 row 1 */}
        <div className="row-start-1 md:col-start-7 md:col-end-9 md:row-start-1">
          {logo}
        </div>

        {/* Tagline — desktop col 11-12 row 1 / mobile col 2 row 1 (under logo) */}
        {tagline && (
          <div className="col-start-2 row-start-1 mt-12.5 md:col-start-11 md:col-end-13 md:mt-0">
            <p className="text-body-serif text-brand-off-white">{tagline}</p>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* Row 2 — primary nav links                                    */}
        {/* ------------------------------------------------------------ */}

        {/* Work With Us + Brand Guidelines — col 1 mobile / col 7-8 desktop */}
        <div className="row-start-2 md:col-start-7 md:col-end-9 md:row-start-2">
          <LinkList links={mainLinks} />
        </div>

        {/* Socials — col 2 mobile / col 11-12 desktop */}
        <div className="row-start-2 md:col-start-11 md:col-end-13 md:row-start-2">
          <LinkList links={socialLinks} />
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Row 3 — sub-category lists                                   */}
        {/* ------------------------------------------------------------ */}

        {/* Research — col 1 mobile / col 7-8 desktop */}
        <div className="row-start-3 md:col-start-7 md:col-end-9 md:row-start-3">
          <LinkList label="Research" links={researchLinks} />
        </div>

        {/* Infrastructure — col 2 mobile / col 11-12 desktop */}
        <div className="row-start-3 md:col-start-11 md:col-end-13 md:row-start-3">
          <LinkList label="Infrastructure" links={infrastructureLinks} />
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Row 4 — legal + built-by                                     */}
        {/* ------------------------------------------------------------ */}

        {/* Legal links — col 1 mobile / col 7-8 desktop */}
        <div className="row-start-4 md:col-start-7 md:col-end-9 md:row-start-4">
          <LinkList links={legalLinks} />
        </div>

        {/* Built by IFT — desktop col 1-2 row 3 (mid-left) / mobile col 2 row 4 */}
        {builtBy && (
          <div className="col-start-2 row-start-4 self-start md:col-start-1 md:col-end-3 md:row-start-3">
            <p className="text-mono-s text-brand-off-white">
              {builtBy.label}{' '}
              {builtBy.href ? (
                <a
                  href={builtBy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  {builtBy.attribution}
                </a>
              ) : (
                builtBy.attribution
              )}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}
