export type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

export type SocialLink = {
  label: string
  link: string
  icon: string
}

/* social */

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'github',
    link: 'https://github.com/thom0x0',
    icon: 'iconoir:github',
  },
  {
    label: 'twitter',
    link: 'https://x.com/thom0x0',
    icon: 'iconoir:twitter',
  },
  {
    label: 'instagram',
    link: 'https://www.instagram.com/thom0x0',
    icon: 'iconoir:instagram',
  },
]

/* contato */

export const EMAIL = 'hi@thom.lol'
