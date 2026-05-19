import { TechTextSplitSection } from '@acid-info/logos-ui'
import type { CtaPanelSection } from '@repo/content/schemas'

type Props = {
  data: CtaPanelSection
}

export default function StorageMain({ data }: Props) {
  return (
    <TechTextSplitSection
      className="mb-15 md:mb-25"
      title={data.title}
      body={
        data.description
          ? data.description
              .split('\n\n')
              .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          : null
      }
    />
  )
}
