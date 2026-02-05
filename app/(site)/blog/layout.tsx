import type { ReactNode } from 'react'

interface LayoutBlogProps {
  children: ReactNode
}

export default function LayoutBlog({ children }: LayoutBlogProps) {
  return <>{children}</>
}
