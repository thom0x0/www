import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  title: 'Conteudo em Bloco',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Bloco',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Citacao', value: 'blockquote' },
      ],
      lists: [
        { title: 'Lista com Marcadores', value: 'bullet' },
        { title: 'Lista Numerada', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrito', value: 'strong' },
          { title: 'Italico', value: 'em' },
          { title: 'Sublinhado', value: 'underline' },
          { title: 'Codigo', value: 'code' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (rule: any) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Abrir em nova aba',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Legenda',
        },
      ],
    }),
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Bloco de Codigo',
      options: {
        withFilename: true,
      },
    }),
  ],
})
