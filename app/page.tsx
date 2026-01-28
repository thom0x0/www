import PersonalClient from './personal-client'
import { getAllPosts } from './blog/_posts'

export default function Page() {
  const posts = getAllPosts()

  return <PersonalClient posts={posts} />
}
