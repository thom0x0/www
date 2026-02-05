import PersonalClient from '../personal-client'
import { getAllPosts } from '@/lib/sanity/queries'

export default async function Page() {
  const posts = await getAllPosts()

  return <PersonalClient posts={posts} />
}
