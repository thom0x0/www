import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Author {
  _id: string
  name: string
  image?: SanityImage
  bio?: string
}

export interface Tag {
  _id: string
  title: string
  slug: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  author: Author
  publishedAt: string
  description: string
  mainImage?: SanityImage & { alt?: string }
  body: PortableTextBlock[]
  tags: Tag[]
}

export interface BlogPostCard {
  _id: string
  title: string
  slug: string
  author: { name: string }
  publishedAt: string
  description: string
  mainImage?: SanityImage & { alt?: string }
  tags: Tag[]
}
