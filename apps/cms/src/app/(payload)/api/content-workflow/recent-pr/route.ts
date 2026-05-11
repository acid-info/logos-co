import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'

import config from '@payload-config'

type ChangeRequestDoc = {
  id: string | number
  contentType?: string | null
  targetPath?: string | null
  branchName?: string | null
  pullRequestNumber?: number | null
  pullRequestUrl?: string | null
  status?: string | null
  updatedAt?: string | null
}

const COLLECTION_CONTENT_TYPES: Record<string, string[]> = {
  circles: ['circle'],
  'circle-events': ['circle-event'],
  'circle-initiatives': ['circle-initiative'],
  'circle-resources': ['circle-resource'],
  ideas: ['idea'],
  rfps: ['rfp'],
}

const matchesSlug = (doc: ChangeRequestDoc, slug: string): boolean => {
  const branchName = doc.branchName ?? ''
  const targetPath = doc.targetPath ?? ''
  return branchName.includes(slug) || targetPath.includes(`/${slug}/`)
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const collection = searchParams.get('collection')
  const slug = searchParams.get('slug')
  if (!collection || !COLLECTION_CONTENT_TYPES[collection]) {
    return NextResponse.json(
      { error: 'unsupported or missing collection' },
      { status: 400 }
    )
  }

  const contentTypes = new Set(COLLECTION_CONTENT_TYPES[collection])
  const result = await payload.find({
    collection: 'content-change-requests',
    depth: 0,
    limit: 100,
    sort: '-updatedAt',
    where: {
      status: {
        equals: 'open',
      },
    },
  })

  const pullRequests = (result.docs as unknown as ChangeRequestDoc[])
    .filter((doc) => contentTypes.has(doc.contentType ?? ''))
    .filter((doc) => !slug || matchesSlug(doc, slug))
    .filter((doc) => doc.pullRequestUrl)
    .slice(0, 3)
    .map((doc) => ({
      id: doc.id,
      branchName: doc.branchName,
      contentType: doc.contentType,
      pullRequestNumber: doc.pullRequestNumber,
      pullRequestUrl: doc.pullRequestUrl,
      status: doc.status,
      targetPath: doc.targetPath,
      updatedAt: doc.updatedAt,
    }))

  return NextResponse.json({ pullRequests })
}
