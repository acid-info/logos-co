import { TechTextSplitSection } from '@acid-info/logos-ui'
import type { CtaPanelSection } from '@repo/content/schemas'

type Props = {
  data: CtaPanelSection
}

export default function BlockchainPrivacy({ data }: Props) {
  return (
    <TechTextSplitSection
      title={data.eyebrow ?? data.title}
      body={data.description ? <p>{data.description}</p> : null}
    />
  )
}
