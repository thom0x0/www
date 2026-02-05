import { sanityClient } from './client'
import type { BlogPost, BlogPostCard, Tag } from './types'

const postCardFields = `
  _id,
  title,
  "slug": slug.current,
  "author": author->{ name },
  publishedAt,
  description,
  mainImage,
  "tags": tags[]->{ _id, title, "slug": slug.current }
`

const postFields = `
  _id,
  title,
  "slug": slug.current,
  "author": author->{ _id, name, image, bio },
  publishedAt,
  description,
  mainImage,
  body,
  "tags": tags[]->{ _id, title, "slug": slug.current }
`

export async function getAllPosts(): Promise<BlogPostCard[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) { ${postCardFields} }`
  return sanityClient.fetch(
    query,
    {} as Record<string, unknown>,
    { next: { revalidate: 60 } }
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`
  const result = await sanityClient.fetch(
    query,
    { slug } as Record<string, unknown>,
    { next: { revalidate: 60 } }
  )
  return result || null
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPostCard[]> {
  const query = `*[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc) { ${postCardFields} }`
  return sanityClient.fetch(
    query,
    { tagSlug } as Record<string, unknown>,
    { next: { revalidate: 60 } }
  )
}

export async function getAllTags(): Promise<Tag[]> {
  const query = `*[_type == "tag"] | order(title asc) { _id, title, "slug": slug.current }`
  return sanityClient.fetch(
    query,
    {} as Record<string, unknown>,
    { next: { revalidate: 120 } }
  )
}

export async function searchPosts(query: string): Promise<BlogPostCard[]> {
  const searchQuery = `*[_type == "post" && (title match $query || description match $query)] | order(publishedAt desc) { ${postCardFields} }`
  return sanityClient.fetch(
    searchQuery,
    { query: `${query}*` } as Record<string, unknown>,
    { next: { revalidate: 30 } }
  )
}

export async function getRelatedPosts(
  postId: string,
  tagIds: string[],
  limit: number = 3
): Promise<BlogPostCard[]> {
  const query = `*[_type == "post" && _id != $postId && count((tags[]._ref)[@ in $tagIds]) > 0] | order(publishedAt desc) [0...$limit] { ${postCardFields} }`
  return sanityClient.fetch(
    query,
    { postId, tagIds, limit } as Record<string, unknown>,
    { next: { revalidate: 60 } }
  )
}
