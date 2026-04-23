import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Button, GiantSwitch, GiantSwitchTag } from '@repo/ui'
import { ROUTES } from '@/constants/routes'

function TagIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={15}
      height={15}
      className="size-[14.4px]"
    />
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15 15"
      className="size-[15px] shrink-0"
      fill="none"
    >
      <path
        d="M4 11L11 4M6 4h5v5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  )
}

export default async function TechOverviewLogosApp() {
  const t = await getTranslations('pages.technologyStack.logosApp')

  return (
    <section className="bg-brand-off-white py-10">
      <GiantSwitch
        accent="grey"
        imagePosition="left"
        image={
          <Image
            src="/images/technology-stack/logos-app.jpg"
            alt=""
            fill
            sizes="(max-width: 767px) 345px, 566px"
          />
        }
        title={
          <>
            <span className="md:hidden">
              Install the
              <br />
              Logos app.
            </span>
            <span className="hidden md:inline">Install the Logos app.</span>
          </>
        }
        description={t('description')}
        tags={
          <>
            <GiantSwitchTag
              icon={<TagIcon src="/design-systems/wallet.svg" alt="" />}
            >
              {t('wallet')}
            </GiantSwitchTag>
            <GiantSwitchTag
              icon={<TagIcon src="/design-systems/chat.svg" alt="" />}
            >
              {t('chatInterface')}
            </GiantSwitchTag>
            <GiantSwitchTag
              icon={<TagIcon src="/design-systems/file.svg" alt="" />}
            >
              {t('filesharingTool')}
            </GiantSwitchTag>
            <GiantSwitchTag
              icon={<TagIcon src="/design-systems/globe.svg" alt="" />}
            >
              {t('explorer')}
            </GiantSwitchTag>
          </>
        }
        actions={
          <>
            <Button
              href={ROUTES.buildersHub}
              variant="secondary"
              icon={<ExternalLinkIcon />}
            >
              {t('installCta')}
            </Button>
            <Button href={ROUTES.buildersHub} variant="tertiary">
              {t('learnMoreCta')}
            </Button>
          </>
        }
      />
    </section>
  )
}
