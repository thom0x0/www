import fs from 'fs'
import path from 'path'

const BLOG_PATH = path.join(process.cwd(), 'app/blog')

export type BlogPost = {
  uid: string
  title: string
  description: string
  link: string
}

export function getAllPosts(): BlogPost[] {
  const folders = fs
    .readdirSync(BLOG_PATH, { withFileTypes: true })
    .filter((dir) => dir.isDirectory() && !dir.name.startsWith('_'))

  return folders.map((folder) => {
    const slug = folder.name
    const postPath = path.join(BLOG_PATH, slug, 'page.mdx')

    const content = fs.readFileSync(postPath, 'utf-8')

    const titleMatch = content.match(/title:\s*['"](.*)['"]/)
    const descMatch = content.match(/description:\s*['"](.*)['"]/)

    return {
      uid: slug,
      title: titleMatch?.[1] ?? slug,
      description: descMatch?.[1] ?? '',
      link: `/blog/${slug}`,
    }
  })
}
