import type { Field } from 'payload'

export const createPublishStatusField = (): Field => ({
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Review', value: 'review' },
    { label: 'Published', value: 'published' },
    { label: 'Archived', value: 'archived' },
  ],
})
