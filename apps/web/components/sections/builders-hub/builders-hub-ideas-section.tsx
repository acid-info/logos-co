import type { Idea } from '@repo/content/loaders'
import type { BuilderHubSettings } from '@repo/content/schemas'

import { BuildersHubSectionHeader } from './section-header'
import { IdeaRow } from './idea-row'

type Props = {
  settings: BuilderHubSettings['ideasSection']
  ideas: Idea[]
}

/**
 * Ideas table section on the Builders Hub home (Figma 40009046:24075 desktop,
 * 40009046:23850 mobile). Header + N rows; each row renders the idea title,
 * tagline + submitter, optional reward, and a CTA.
 */
export function BuildersHubIdeasSection({ settings, ideas }: Props) {
  return (
    <section className="border-t border-brand-dark-green/10 bg-brand-off-white">
      <div className="mx-auto max-w-360 px-3 pt-10 pb-10">
        <BuildersHubSectionHeader
          title={settings.title}
          eyebrow={settings.description}
          topRightCta={settings.seeAllCta}
        />

        <ul className="mt-[77px] w-full">
          {ideas.map((idea, index) => (
            <IdeaRow key={idea.slug} index={index + 1} idea={idea} />
          ))}
        </ul>
      </div>
    </section>
  )
}
