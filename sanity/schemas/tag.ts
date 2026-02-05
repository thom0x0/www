import { defineField, defineType } from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 64,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
