/**
 * /design-systems — 1:1 mirror of Figma frames
 *
 *   Color Palette   — node 40009046:20492
 *   Type Styles     — node 40009046:20537
 *
 * Responsive note:
 * - Figma canvas is 1440px wide. We cap with max-w-[1440px] and let children
 *   shrink via aspect-ratio (color swatches) and flex layout (type rows).
 * - Below md (~768px) the specimen columns stack instead of sitting side by side.
 *
 * Font substitution note:
 * - Figma uses "Scto Grotesk A Medium" (commercial, unavailable) for all UI
 *   labels. We substitute the repo's --font-sans (Public Sans), which matches
 *   the grotesk character without shipping a commercial font.
 * - "Rhymes Display" / "Rhymes Text" are also commercial; the typography
 *   specimens use --font-display which falls back to Times New Roman → serif
 *   until the licensed woff2 is dropped.
 */
import Image from 'next/image'

import {
  CardInfo,
  Footer,
  GiantSwitch,
  GiantSwitchTag,
  LogosMark,
  Pagination,
  Table,
  TableRow,
  ViewToggle,
} from '@repo/ui'
import { Button, Card } from '@/components/ui'

import { createDefaultMetadata } from '@/utils/metadata'

const cardImages = {
  storage: '/design-systems/storage.png',
  messaging: '/design-systems/messaging.png',
  blockchain: '/design-systems/blockchain.png',
  userModules: '/design-systems/user-modules.png',
  networking: '/design-systems/networking.png',
  kernel: '/design-systems/kernel.png',
} as const

function Thumb({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={46} height={57} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return createDefaultMetadata({
    title: 'Design System',
    description:
      'Logos design tokens — Color Palette and Type Styles mirrored from Figma.',
    locale,
    path: '/design-systems',
  })
}

// --- Color Palette ------------------------------------------------------

type ColorSwatchProps = {
  name: string
  hex: string
  bg: string
  textColor: 'white' | 'black'
  bordered?: boolean
  /** width / height ratio as a CSS aspect-ratio string (e.g. "1400/559"). */
  aspect: string
}

function ColorSwatch({
  name,
  hex,
  bg,
  textColor,
  bordered,
  aspect,
}: ColorSwatchProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${bg} ${bordered ? 'border border-black' : ''}`}
      style={{ aspectRatio: aspect }}
    >
      <div
        className={`absolute bottom-[9px] left-[9px] ${textColor === 'white' ? 'text-white' : 'text-black'}`}
      >
        <p className="text-[16px] leading-[1.2]">{name}</p>
        <p className="text-[16px] leading-[1.2]">{hex}</p>
      </div>
    </div>
  )
}

function ColorPalette() {
  return (
    <div className="font-sans flex w-full flex-col gap-[24px] bg-white p-[20px]">
      {/* Header */}
      <div className="flex w-full max-w-[343px] items-center justify-between text-[18px] leading-[1.2] text-black">
        <p>Logos Design System</p>
        <p>Color Palette</p>
      </div>

      {/* Dark Green */}
      <ColorSwatch
        name="Dark Green"
        hex="#152521"
        bg="bg-brand-dark-green"
        textColor="white"
        aspect="1400/559"
      />

      {/* Dark Green 50% / 10% / 5% */}
      <div className="flex w-full items-start gap-[24px]">
        <div className="flex-1">
          <ColorSwatch
            name="Dark Green 50%"
            hex="#152521 50%"
            bg="bg-brand-dark-green/50"
            textColor="white"
            aspect="450/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Dark Green 10%"
            hex="#152521 10%"
            bg="bg-brand-dark-green/10"
            textColor="black"
            bordered
            aspect="450/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Dark Green 5%"
            hex="#152521 5%"
            bg="bg-brand-dark-green/5"
            textColor="black"
            bordered
            aspect="450/227"
          />
        </div>
      </div>

      {/* Off-White */}
      <ColorSwatch
        name="Off-White"
        hex="#F5F5EF"
        bg="bg-brand-off-white"
        textColor="black"
        bordered
        aspect="1400/416"
      />

      {/* Off-White 50% / 10% */}
      <div className="flex w-full items-start gap-[24px]">
        <div className="flex-1">
          <ColorSwatch
            name="Off-White 50%"
            hex="#F5F5EF 50%"
            bg="bg-brand-off-white/50"
            textColor="black"
            bordered
            aspect="688/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Off-White 10%"
            hex="#F5F5EF 10%"
            bg="bg-brand-off-white/10"
            textColor="black"
            bordered
            aspect="688/227"
          />
        </div>
      </div>

      {/* Accent bands */}
      <ColorSwatch
        name="Steel Teal"
        hex="#5F797C"
        bg="bg-accent-steel-teal"
        textColor="white"
        aspect="1400/227"
      />
      <ColorSwatch
        name="Light Blue"
        hex="#C6EBF7"
        bg="bg-accent-light-blue"
        textColor="black"
        aspect="1400/227"
      />
      <ColorSwatch
        name="Tan"
        hex="#E2E0C9"
        bg="bg-accent-tan"
        textColor="black"
        aspect="1400/227"
      />
      <ColorSwatch
        name="Brown"
        hex="#A18863"
        bg="bg-accent-brown"
        textColor="black"
        aspect="1400/227"
      />
      <ColorSwatch
        name="Yellow"
        hex="#FFD328"
        bg="bg-brand-yellow"
        textColor="black"
        aspect="1400/227"
      />
      <ColorSwatch
        name="Purple"
        hex="#48373F"
        bg="bg-accent-purple"
        textColor="white"
        aspect="1400/227"
      />

      {/* Grey ramp */}
      <div className="flex w-full items-start gap-[24px]">
        <div className="flex-1">
          <ColorSwatch
            name="Grey 01"
            hex="#DBDDD7"
            bg="bg-gray-01"
            textColor="black"
            aspect="213/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Grey 02"
            hex="#B8BDB8"
            bg="bg-gray-02"
            textColor="black"
            aspect="213/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Grey 03"
            hex="#9EA5A0"
            bg="bg-gray-03"
            textColor="black"
            aspect="213/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Grey 04"
            hex="#848E88"
            bg="bg-gray-04"
            textColor="white"
            aspect="213/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Grey 05"
            hex="#616E69"
            bg="bg-gray-05"
            textColor="white"
            aspect="213/227"
          />
        </div>
        <div className="flex-1">
          <ColorSwatch
            name="Grey 06"
            hex="#475651"
            bg="bg-gray-06"
            textColor="white"
            aspect="213/227"
          />
        </div>
      </div>
    </div>
  )
}

// --- Type Styles --------------------------------------------------------

type TypeRow = {
  label: React.ReactNode
  desktopClass: string
  desktopStyle?: React.CSSProperties
  mobileClass: string
  mobileStyle?: React.CSSProperties
  desktopMeta: [string, string, string, string, string]
  mobileMeta: [string, string, string, string, string]
  sameAsDesktop?: boolean
  specimenLeading: string
  sample: string
}

const typeRows: TypeRow[] = [
  {
    label: 'Hero',
    specimenLeading: 'leading-none',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 140, letterSpacing: '-0.04em' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 70, letterSpacing: '-0.04em' },
    desktopMeta: ['Rhymes Display', 'Regular', '140 pt.', '100%', '-4%'],
    mobileMeta: ['Rhymes Display', 'Regular', '70 pt.', '100%', '-4%'],
    sample: 'Pioneer',
  },
  {
    label: 'H1',
    specimenLeading: 'leading-[0.98]',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 96, letterSpacing: '-0.04em' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 56, letterSpacing: '-0.04em' },
    desktopMeta: ['Rhymes Display', 'Regular', '96 pt.', '98%', '-4%'],
    mobileMeta: ['Rhymes Display', 'Regular', '56 pt.', '98%', '-4%'],
    sample: 'Pioneer',
  },
  {
    label: 'H2',
    specimenLeading: 'leading-none',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 56, letterSpacing: '-0.03em' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 40, letterSpacing: '-0.03em' },
    desktopMeta: ['Rhymes Display', 'Regular', '56 pt.', '100%', '-3%'],
    mobileMeta: ['Rhymes Display', 'Regular', '40 pt.', '100%', '-3%'],
    sample: 'Pioneer',
  },
  {
    label: 'H3 Serif',
    specimenLeading: 'leading-none',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 36, letterSpacing: '-0.03em' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 30, letterSpacing: '-0.03em' },
    desktopMeta: ['Rhymes Display', 'Regular', '36 pt.', '100%', '-3%'],
    mobileMeta: ['Rhymes Display', 'Regular', '30 pt.', '100%', '-3%'],
    sample: 'Pioneer',
  },
  {
    label: 'H3 Sans',
    specimenLeading: 'leading-none',
    desktopClass: 'font-sans',
    desktopStyle: { fontSize: 36, letterSpacing: '-0.02em' },
    mobileClass: 'font-sans',
    mobileStyle: { fontSize: 30, letterSpacing: '-0.02em' },
    desktopMeta: ['Public Sans', 'Regular', '36 pt.', '100%', '-2%'],
    mobileMeta: ['Public Sans', 'Regular', '30 pt.', '100%', '-2%'],
    sample: 'Pioneer',
  },
  {
    label: 'H4 Serif',
    specimenLeading: 'leading-[1.1]',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 24, letterSpacing: '-0.01em' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 24, letterSpacing: '-0.01em' },
    desktopMeta: ['Rhymes Display', 'Regular', '24 pt.', '110%', '-1%'],
    mobileMeta: ['Rhymes Display', 'Regular', '24 pt.', '110%', '-1%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: 'H4 Sans',
    specimenLeading: 'leading-[1.1]',
    desktopClass: 'font-sans',
    desktopStyle: { fontSize: 24, letterSpacing: '-0.01em' },
    mobileClass: 'font-sans',
    mobileStyle: { fontSize: 24, letterSpacing: '-0.01em' },
    desktopMeta: ['Public Sans', 'Regular', '24 pt.', '110%', '-1%'],
    mobileMeta: ['Public Sans', 'Regular', '24 pt.', '110%', '-1%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: (
      <>
        Subhead
        <br />
        Serif
      </>
    ),
    specimenLeading: 'leading-[1.1]',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 18, letterSpacing: '-0.01em' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 18, letterSpacing: '-0.01em' },
    desktopMeta: ['Rhymes Display', 'Regular', '18 pt.', '110%', '-1%'],
    mobileMeta: ['Rhymes Display', 'Regular', '18 pt.', '110%', '-1%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: (
      <>
        Subhead
        <br />
        Sans
      </>
    ),
    specimenLeading: 'leading-[1.15]',
    desktopClass: 'font-sans',
    desktopStyle: { fontSize: 18, letterSpacing: '-0.01em' },
    mobileClass: 'font-sans',
    mobileStyle: { fontSize: 18, letterSpacing: '-0.01em' },
    desktopMeta: ['Public Sans', 'Regular', '18 pt.', '115%', '-1%'],
    mobileMeta: ['Public Sans', 'Regular', '18 pt.', '115%', '-1%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: 'Body Serif',
    specimenLeading: 'leading-[1.2]',
    desktopClass: 'font-display',
    desktopStyle: { fontSize: 14, letterSpacing: '0' },
    mobileClass: 'font-display',
    mobileStyle: { fontSize: 14, letterSpacing: '0' },
    desktopMeta: ['Rhymes Display', 'Regular', '14 pt.', '120%', '0%'],
    mobileMeta: ['Rhymes Display', 'Regular', '14 pt.', '120%', '0%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: 'Body Sans',
    specimenLeading: 'leading-[1.2]',
    desktopClass: 'font-sans',
    desktopStyle: { fontSize: 14, letterSpacing: '0' },
    mobileClass: 'font-sans',
    mobileStyle: { fontSize: 14, letterSpacing: '0' },
    desktopMeta: ['Public Sans', 'Regular', '14 pt.', '120%', '0%'],
    mobileMeta: ['Public Sans', 'Regular', '14 pt.', '120%', '0%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: (
      <>
        Eyebrow /<br />
        CTA
      </>
    ),
    specimenLeading: 'leading-[1.3]',
    desktopClass: 'font-mono font-medium uppercase',
    desktopStyle: { fontSize: 10, letterSpacing: '0' },
    mobileClass: 'font-mono font-medium uppercase',
    mobileStyle: { fontSize: 10, letterSpacing: '0' },
    desktopMeta: ['Fira Code', 'Medium', '10 pt.', '130%', '0%'],
    mobileMeta: ['Fira Code', 'Medium', '10 pt.', '130%', '0%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
  {
    label: 'Mono S',
    specimenLeading: 'leading-[1.3]',
    desktopClass: 'font-mono',
    desktopStyle: { fontSize: 10, letterSpacing: '0' },
    mobileClass: 'font-mono',
    mobileStyle: { fontSize: 10, letterSpacing: '0' },
    desktopMeta: ['Fira Code', 'Regular', '10 pt.', '130%', '0%'],
    mobileMeta: ['Fira Code', 'Regular', '10 pt.', '130%', '0%'],
    sameAsDesktop: true,
    sample: 'Pioneer',
  },
]

function MetaBlock({
  lines,
}: {
  lines: [string, string, string, string, string]
}) {
  return (
    <div className="text-[16px] leading-[1.2] text-black opacity-50">
      {lines.map((line, i) => (
        <p key={i} className="leading-[1.2]">
          {line}
        </p>
      ))}
    </div>
  )
}

function SameAsDesktopTag() {
  return (
    <span className="inline-flex h-[24px] items-center justify-center rounded-full bg-brand-yellow px-[10px] text-[10px] font-medium leading-[1.3] text-black uppercase">
      Same as desktop
    </span>
  )
}

function TypeStyles() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="font-sans w-full min-w-[640px] border border-[rgba(0,0,0,0.5)] bg-white md:min-w-0">
        {/* Header row */}
        <div className="flex flex-col gap-[12px] p-[19px] md:flex-row md:items-start md:gap-[20px]">
          <p className="text-[18px] leading-[1.2] text-black md:w-[15.5%] md:shrink-0">
            Logos Design System
          </p>
          <p className="text-[18px] leading-[1.2] text-black">
            Web Type Styles
          </p>
        </div>

        {/* Column labels + breakpoint scale — desktop only */}
        <div className="hidden items-start gap-[20px] px-[19px] md:flex">
          <div className="w-[15.5%] shrink-0" />
          <div className="flex-1">
            <div className="flex items-start gap-[20px] text-[16px] leading-[1.2] text-black">
              <div className="w-1/2">
                <p>Desktop</p>
                <p>∞-800 px Wide</p>
              </div>
              <div className="w-1/2">
                <p>Mobile</p>
                <p>800-0 px Wide</p>
              </div>
            </div>
            <div className="relative mt-[8px] h-[9px]">
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black" />
              <span className="absolute top-0 left-0 block size-[9px] rounded-full border border-black bg-black" />
              <span className="absolute top-0 left-1/2 block size-[9px] -translate-x-1/2 rounded-full border border-black bg-black" />
              <span className="absolute top-0 right-0 block size-[9px] rounded-full border border-black bg-white" />
            </div>
          </div>
        </div>

        {/* Style Name label */}
        <p className="px-[19px] pt-[32px] text-[18px] leading-[1.2] text-black md:pt-[64px]">
          Style Name
        </p>

        {/* Rows */}
        <div className="flex flex-col px-[19px] pt-[16px]">
          {typeRows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-[16px] border-t border-black pt-[16px] pb-[40px] md:flex-row md:justify-between md:gap-[20px] md:pb-[80px]"
            >
              <p className="w-full shrink-0 text-[24px] leading-[1.2] text-black md:w-[15.5%] md:text-[30px]">
                {row.label}
              </p>

              <div className="flex w-full flex-1 flex-col gap-[24px]">
                {/* Specimens */}
                <div
                  className={`flex flex-col gap-[20px] md:flex-row md:items-baseline ${row.specimenLeading}`}
                >
                  <div className="flex w-full flex-col gap-[8px] md:w-1/2">
                    <p className="text-[14px] leading-[1.2] text-black md:hidden">
                      Desktop
                    </p>
                    <p
                      className={`min-w-0 overflow-hidden ${row.desktopClass}`}
                      style={row.desktopStyle}
                    >
                      {row.sample}
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-[8px] md:w-1/2">
                    <p className="flex items-center gap-[10px] text-[14px] leading-[1.2] text-black md:hidden">
                      Mobile
                      {row.sameAsDesktop && <SameAsDesktopTag />}
                    </p>
                    <p
                      className={`min-w-0 overflow-hidden ${row.mobileClass}`}
                      style={row.mobileStyle}
                    >
                      {row.sample}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-col gap-[20px] text-[16px] text-black md:flex-row md:items-start">
                  <div className="flex w-full flex-col gap-[5px] md:w-1/2">
                    <p className="leading-[1.2]">Desktop</p>
                    <MetaBlock lines={row.desktopMeta} />
                  </div>
                  <div className="flex w-full flex-col gap-[5px] md:w-1/2">
                    <div className="flex items-center gap-[10px]">
                      <p className="leading-[1.2]">Mobile</p>
                      {row.sameAsDesktop && (
                        <span className="hidden md:inline-flex">
                          <SameAsDesktopTag />
                        </span>
                      )}
                    </div>
                    <MetaBlock lines={row.mobileMeta} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Cards --------------------------------------------------------------

function CardGrid({ state }: { state: 'default' | 'hover' }) {
  const isHover = state === 'hover'
  const networkingTitle = (
    <>
      <span className="block">The Networking Stack:</span>
      <span className="block">Discovery, Peering, and Mix-Net</span>
    </>
  )

  return (
    <div className="flex flex-col gap-[12px]">
      {/* Row 1: four small cards */}
      <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-4">
        <Card
          height={366}
          forceHover={isHover}
          staticDefault={!isHover}
          image={isHover && <Thumb src={cardImages.storage} alt="" />}
          title="Storage"
          description={
            isHover
              ? 'Decentralized file storage and retrieval, using content-addressed (CID-based) data'
              : undefined
          }
          ctaHref={isHover ? '#' : undefined}
        />
        <Card
          height={366}
          forceHover={isHover}
          staticDefault={!isHover}
          image={isHover && <Thumb src={cardImages.messaging} alt="" />}
          title="Messaging"
          description={
            isHover
              ? 'Private, censorship-resistant communication between parties.'
              : undefined
          }
          ctaHref={isHover ? '#' : undefined}
        />
        <Card
          height={366}
          forceHover={isHover}
          staticDefault={!isHover}
          image={isHover && <Thumb src={cardImages.blockchain} alt="" />}
          title="Blockchain"
          description={
            isHover ? 'Decentralized compute and consensus.' : undefined
          }
          ctaHref={isHover ? '#' : undefined}
        >
          {isHover && (
            <>
              <CardInfo
                height={78}
                label="Logos Execution Zone (LEZ)"
                description="Developers can deploy programs, run AMMs, transfer tokens, and build financial primitives with built-in privacy."
              />
              <CardInfo
                height={78}
                label="Data Availability and Consensus: Cryptarchia"
                description="A private proof-of-stake consensus mechanism where validator identities and stake amounts remain hidden."
              />
            </>
          )}
        </Card>
        <Card
          height={366}
          forceHover={isHover}
          staticDefault={!isHover}
          image={isHover && <Thumb src={cardImages.userModules} alt="" />}
          title="User Modules"
          description={
            isHover
              ? 'Anyone can build modules that plug into the same IPC infrastructure.'
              : undefined
          }
          ctaHref={isHover ? '#' : undefined}
        />
      </div>

      {/* Row 2: wide band — Networking Stack (no Lambda icon glyph in Figma) */}
      <Card
        height={196}
        forceHover={isHover}
        staticDefault={!isHover}
        showIcon={false}
        image={isHover && <Thumb src={cardImages.networking} alt="" />}
        title={networkingTitle}
        description={
          isHover
            ? 'This layer handles how Logos nodes find each other, establish connections, and communicate.'
            : undefined
        }
        ctaHref={isHover ? '#' : undefined}
      />

      {/* Row 3: wide band — Foundation Kernel (no Lambda icon glyph in Figma) */}
      <Card
        height={196}
        forceHover={isHover}
        staticDefault={!isHover}
        showIcon={false}
        image={isHover && <Thumb src={cardImages.kernel} alt="" />}
        title="The Foundation: Logos Kernel"
        description={
          isHover
            ? 'A microkernel that handles the essential primitives every decentralized application needs.'
            : undefined
        }
        ctaHref={isHover ? '#' : undefined}
      />
    </div>
  )
}

function Cards() {
  return (
    <div className="flex w-full flex-col gap-[80px] bg-white p-[20px]">
      <div className="flex flex-col gap-[32px]">
        <h2 className="font-display text-[64px] leading-[1] tracking-[-0.03em] text-brand-dark-green">
          Default
        </h2>
        <CardGrid state="default" />
      </div>

      <div className="flex flex-col gap-[32px]">
        <h2 className="font-display text-[64px] leading-[1] tracking-[-0.03em] text-brand-dark-green">
          Hover
        </h2>
        <CardGrid state="hover" />
      </div>
    </div>
  )
}

// --- Buttons ------------------------------------------------------------

function Buttons() {
  return (
    <div className="flex w-full flex-col gap-[32px] bg-white p-[20px]">
      <h2 className="font-display text-[64px] leading-[1] tracking-[-0.03em] text-brand-dark-green">
        Buttons
      </h2>
      <div className="grid grid-cols-1 items-start gap-[32px] sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-[12px]">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            Primary
          </p>
          <Button variant="primary" href="#">
            View The Docs
          </Button>
        </div>
        <div className="flex flex-col items-start gap-[12px]">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            Secondary
          </p>
          <Button variant="secondary" href="#">
            View The Docs
          </Button>
        </div>
        <div className="flex flex-col items-start gap-[12px]">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            Tertiary
          </p>
          <Button variant="tertiary" href="#">
            View The Docs
          </Button>
        </div>
        <div className="flex flex-col items-start gap-[12px]">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            Link
          </p>
          <Button variant="link" href="#">
            View The Docs
          </Button>
        </div>
      </div>
    </div>
  )
}

// --- Table --------------------------------------------------------------

const tableRows = [
  { number: '01', title: 'Secure and Decentralized Frontends' },
  { number: '02', title: 'Build a DEX' },
  { number: '03', title: 'Integrate Logos blockchain into Fileverse' },
  { number: '02', title: 'Lorem Ipsum Dolor Si Amet' },
  { number: '03', title: 'Secure and Decentralized Frontends' },
  { number: '02', title: 'Build a DEX' },
  { number: '03', title: 'Integrate Logos blockchain into Fileverse' },
] as const

function Tables() {
  const description = (
    <>
      <p>Quadratic voting platform for DAO members</p>
      <p>Idea by @jonny</p>
    </>
  )
  const reward = (
    <>
      <p>2500 USDC</p>
      <p>+ 1000 XP</p>
    </>
  )

  return (
    <div className="flex w-full flex-col gap-[32px] bg-white p-[20px]">
      <h2 className="font-display text-[64px] leading-[1] tracking-[-0.03em] text-brand-dark-green">
        Table
      </h2>
      <Table
        title="Ideas"
        subtitle="Ideas from our community driving sovereignty forward."
        action={
          <Button variant="link" href="#">
            See all ideas
          </Button>
        }
      >
        {tableRows.map((row, i) => (
          <TableRow
            key={i}
            number={row.number}
            title={row.title}
            description={description}
            reward={reward}
            action={
              <Button variant="link" href="#">
                Apply
              </Button>
            }
          />
        ))}
      </Table>
    </div>
  )
}

// --- Giant Switch -------------------------------------------------------

function TagIcon({ src, alt }: { src: string; alt: string }) {
  // SVGs are rendered as <img> so their fill uses whatever Figma authored.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={14} height={14} />
}

function GiantSwitches() {
  const installTags = (
    <>
      <GiantSwitchTag
        icon={<TagIcon src="/design-systems/wallet.svg" alt="" />}
      >
        Wallet
      </GiantSwitchTag>
      <GiantSwitchTag icon={<TagIcon src="/design-systems/chat.svg" alt="" />}>
        Chat Interface
      </GiantSwitchTag>
      <GiantSwitchTag icon={<TagIcon src="/design-systems/file.svg" alt="" />}>
        Filesharing Tool
      </GiantSwitchTag>
      <GiantSwitchTag icon={<TagIcon src="/design-systems/globe.svg" alt="" />}>
        Explorer
      </GiantSwitchTag>
    </>
  )

  const heroImage = (
    <Image
      src="/design-systems/giant-switch-hero.jpg"
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 600px"
    />
  )

  return (
    <div className="flex w-full flex-col gap-[32px] bg-white py-[20px]">
      <h2 className="px-[20px] font-display text-[64px] leading-[1] tracking-[-0.03em] text-brand-dark-green">
        Giant Switch
      </h2>

      <GiantSwitch
        accent="grey"
        imagePosition="left"
        image={heroImage}
        title="Install the Logos app."
        description="The Logos App is a a complete distribution that bundles the kernel, the default modules, and UI packages into a usable product. It provides the primary user interface, hosting “Simple Apps” that let users interact with the various modules:"
        tags={installTags}
        actions={
          <>
            <Button variant="secondary" href="#">
              Install
            </Button>
            <Button variant="tertiary" href="#">
              Learn more
            </Button>
          </>
        }
      />

      <GiantSwitch
        accent="yellow"
        imagePosition="right"
        image={heroImage}
        title="Download started!"
        description="If you don’t immediately see lorem ipsum dolor si amet consectetur in your browser downloads, click Download Again below."
        actions={
          <>
            <Button variant="secondary" href="#">
              Download again
            </Button>
            <Button variant="tertiary" href="#">
              Learn more
            </Button>
          </>
        }
      />
    </div>
  )
}

// --- View Toggle --------------------------------------------------------

function ViewToggles() {
  const options = [
    { id: 'grid', label: 'Grid' },
    { id: 'list', label: 'List' },
  ] as const

  return (
    <div className="flex w-full flex-col gap-8 bg-white p-5">
      <h2 className="font-display text-[64px] leading-none tracking-[-0.03em] text-brand-dark-green">
        View Toggle
      </h2>
      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-3">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            Grid active (default on /rfps)
          </p>
          <ViewToggle
            options={[...options]}
            view="grid"
            getHref={(id) => `#view=${id}`}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            List active (default on /ideas)
          </p>
          <ViewToggle
            options={[...options]}
            view="list"
            getHref={(id) => `#view=${id}`}
          />
        </div>
      </div>
    </div>
  )
}

// --- Pagination ---------------------------------------------------------

function Paginations() {
  return (
    <div className="flex w-full flex-col gap-8 bg-white p-5">
      <h2 className="font-display text-[64px] leading-none tracking-[-0.03em] text-brand-dark-green">
        Pagination
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-3">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            3 pages · current 1
          </p>
          <Pagination
            currentPage={1}
            totalPages={3}
            getHref={(p) => `#page=${p}`}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            5 pages · current 3
          </p>
          <Pagination
            currentPage={3}
            totalPages={5}
            getHref={(p) => `#page=${p}`}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className="font-mono text-[10px] leading-[1.3] font-medium text-brand-dark-green uppercase opacity-50">
            10 pages · current 5 · ellipsis collapse
          </p>
          <Pagination
            currentPage={5}
            totalPages={10}
            getHref={(p) => `#page=${p}`}
          />
        </div>
      </div>
    </div>
  )
}

// --- Footer -------------------------------------------------------------

function LogosLockup() {
  return (
    <span className="inline-flex items-center gap-2 text-brand-off-white">
      <LogosMark size={15} className="shrink-0" />
      <span className="font-display text-[18px] leading-none">Logos</span>
    </span>
  )
}

function Footers() {
  const mainLinks = [
    { label: 'Work With Us', href: '#' },
    { label: 'Brand Kit', href: '#' },
  ]
  const socialLinks = [
    { label: 'Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Github', href: '#' },
  ]
  const researchLinks = [{ label: 'VacP2P', href: '#' }]
  const infrastructureLinks = [
    { label: 'Waku', href: '#' },
    { label: 'Nimbus', href: '#' },
    { label: 'Codex', href: '#' },
    { label: 'Nomos', href: '#' },
  ]
  const legalLinks = [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Security', href: '#' },
  ]

  return (
    <div className="flex w-full flex-col gap-8 bg-white p-5">
      <h2 className="font-display text-[64px] leading-none tracking-[-0.03em] text-brand-dark-green">
        Footer
      </h2>
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
        mainLinks={mainLinks}
        socialLinks={socialLinks}
        researchLinks={researchLinks}
        infrastructureLinks={infrastructureLinks}
        legalLinks={legalLinks}
        builtBy={{ label: 'Built by', attribution: 'IFT', href: '#' }}
      />
    </div>
  )
}

// --- Page ---------------------------------------------------------------

export default function DesignSystemsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[40px] py-10">
      <ColorPalette />
      <TypeStyles />
      <Cards />
      <Buttons />
      <Tables />
      <GiantSwitches />
      <ViewToggles />
      <Paginations />
      <Footers />
    </div>
  )
}
