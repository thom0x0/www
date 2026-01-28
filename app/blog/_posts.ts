import fs from 'fs'
import path from 'path'

const BLOG_PATH = path.join(process.cwd(), 'app/blog')

export type BlogPost = {
  uid: string
  title: string
  description: string
  link: string
}

let cachedPosts: BlogPost[] | null = null
let lastCacheTime: number | null = null
const CACHE_TTL = 60_000

function extractMetadataFromMDX(content: string): {
  title?: string
  description?: string
} {
  const slice = content.slice(0, 2000)

  const metadataMatch = slice.match(
    /export\s+const\s+metadata\s*=\s*{([\s\S]*?)}\s*/m,
  )

  if (!metadataMatch) return {}

  const metadataBlock = metadataMatch[1]

  const titleMatch = metadataBlock.match(/title:\s*['"`]([^'"`]+)['"`]/)
  const descriptionMatch = metadataBlock.match(
    /description:\s*['"`]([^'"`]+)['"`]/,
  )

  return {
    title: titleMatch?.[1],
    description: descriptionMatch?.[1],
  }
}

function readPost(slug: string): BlogPost | null {
  const postPath = path.join(BLOG_PATH, slug, 'page.mdx')
  if (!fs.existsSync(postPath)) return null

  const content = fs.readFileSync(postPath, 'utf-8')
  const { title, description } = extractMetadataFromMDX(content)

  return {
    uid: slug,
    title: title ?? slug,
    description: description ?? '',
    link: `/blog/${slug}`,
  }
}

export function getAllPosts(): BlogPost[] {
  if (
    process.env.NODE_ENV === 'development' &&
    cachedPosts &&
    lastCacheTime &&
    Date.now() - lastCacheTime < CACHE_TTL
  ) {
    return cachedPosts
  }

  if (!fs.existsSync(BLOG_PATH)) return []

  const folders = fs
    .readdirSync(BLOG_PATH, { withFileTypes: true })
    .filter(
      (dir) =>
        dir.isDirectory() &&
        !dir.name.startsWith('_') &&
        !dir.name.startsWith('.'),
    )

  const posts = folders
    .map((folder) => readPost(folder.name))
    .filter((p): p is BlogPost => Boolean(p))

  posts.sort((a, b) => a.title.localeCompare(b.title, 'pt'))

  cachedPosts = posts
  lastCacheTime = Date.now()

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (cachedPosts) {
    const cached = cachedPosts.find((p) => p.uid === slug)
    if (cached) return cached
  }

  return readPost(slug)
}

export function clearPostsCache() {
  cachedPosts = null
  lastCacheTime = null
}
