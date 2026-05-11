import type {
  CollectionBeforeChangeHook,
  CollectionBeforeDeleteHook,
  Payload,
  User,
} from 'payload'

import type {
  SaveAsPullRequestResult,
  SaveContentAsPullRequestInput,
  SavePrEditor,
} from '@/services/content-workflow'

export const SKIP_CONTENT_PR_CONTEXT = 'skipContentPr'

type FindByIdCollection = Parameters<Payload['findByID']>[0]['collection']

interface CreateChangePullRequestHookInput<TDoc> {
  save: (
    input: SaveContentAsPullRequestInput<TDoc>
  ) => Promise<SaveAsPullRequestResult>
}

interface CreateDeletePullRequestHookInput<
  TDoc,
> extends CreateChangePullRequestHookInput<TDoc> {
  collection: FindByIdCollection
}

const getEditor = (user: User): SavePrEditor => ({
  email: typeof user.email === 'string' ? user.email : undefined,
  payloadUserId: user.id,
})

const shouldSkipContentPr = (context: Record<string, unknown>): boolean =>
  context[SKIP_CONTENT_PR_CONTEXT] === true

export const createChangePullRequestHook =
  <TDoc>({
    save,
  }: CreateChangePullRequestHookInput<TDoc>): CollectionBeforeChangeHook =>
  async ({ context, data, operation, originalDoc, req }) => {
    if (shouldSkipContentPr(context) || !req.user) return data

    const doc =
      operation === 'update'
        ? ({ ...(originalDoc ?? {}), ...data } as TDoc)
        : (data as TDoc)

    await save({
      doc,
      payload: req.payload,
      editor: getEditor(req.user),
    })

    return data
  }

export const createDeletePullRequestHook =
  <TDoc>({
    collection,
    save,
  }: CreateDeletePullRequestHookInput<TDoc>): CollectionBeforeDeleteHook =>
  async ({ context, id, req }) => {
    if (shouldSkipContentPr(context) || !req.user) return

    const doc = (await req.payload.findByID({
      collection,
      id,
      depth: 0,
    })) as TDoc

    await save({
      doc,
      payload: req.payload,
      editor: getEditor(req.user),
    })
  }
