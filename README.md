# 📝 thom.lol

repository for my personal website: a place to write, organize ideas, and keep everyday notes.

## 📦 quick stack
- next.js 15 (app router) + react 19
- typescript + tailwind css v4
- mdx (with sugar-high for syntax highlighting)
- sanity cms + studio at `/studio` (protected with basic auth)

## ✨ features
- animated homepage with banner, interests list, and social links
- blog with search, tag filtering, and post cards (date/author)
- mdx posts with a custom cover component (`<cover />`) and code highlighting
- light/dark theme and responsive layout
- webhook revalidation via `post /api/revalidate`

## 🚀 running locally
1) install dependencies: `bun install` (or `npm install`)
2) create `.env.local` with:
   - `next_public_sanity_project_id`
   - `next_public_sanity_dataset` (e.g. `production`)
   - `sanity_api_token` (for the revalidate webhook)
   - `studio_user` and `studio_pass` (to protect `/studio`)
3) start: `bun run dev` (or `npm run dev`)

useful scripts: `bun run lint`, `bun run type-check`, `bun run build`, `bun run analyze`.

## 🗂️ project structure
- `app/(site)`: public pages (`/`, `/blog`, posts)
- `app/studio`: embedded sanity studio
- `lib/sanity`: cms config, queries, and types
- `components/ui`: micro animations (background, magnetic, etc.)
- `sanity/schemas`: models for `post`, `tag`, `author`, `blockContent`

## 👋 credits
project adapted from the [nim](https://github.com/ibelick/nim?tab=readme-ov-file) template, gradually customized to match my own style :)
