export type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

export type SocialLink = {
  label: string
  link: string
}

/* blog */

export const BLOG_POSTS: BlogPost[] = [
  {
    uid: '1',
    title: 'sobre escrever',
    description: 'por que gosto de colocar pensamentos em palavras.',
    link: '/blog/sobre-escrever',
  },
  {
    uid: '2',
    title: 'história e repetição',
    description: 'algumas coisas mudam, outras nem tanto.',
    link: '/blog/historia-e-repeticao',
  },
]

/* social */

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'github',
    link: 'https://github.com/thom0x0',
  },
  {
    label: 'twitter',
    link: 'https://x.com/thom0x0',
  },
  {
    label: 'instagram',
    link: 'https://www.instagram.com/thom0x0',
  },
]

/* contato */

export const EMAIL = 'hi@thom.lol'
