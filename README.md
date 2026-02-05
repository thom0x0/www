# 📝 thom.lol

repo do meu site pessoal: um lugar para escrever, organizar ideias e guardar coisas do dia a dia.

## 📦 stack rápida
- Next.js 15 (App Router) + React 19
- TypeScript + Tailwind CSS v4
- MDX (com sugar-high para syntax highlight)
- Sanity CMS + Studio em `/studio` (protegido por basic auth)

## ✨ funcionalidades
- homepage animada com banner, lista de interesses e links sociais
- blog com busca, filtro por tags e cards com data/autor
- posts em MDX com componente de capa (`<Cover />`) e highlight de código
- tema claro/escuro e layout responsivo
- revalidação via webhook em `POST /api/revalidate`

## 🚀 como rodar local
1) instalar deps: `bun install` (ou `npm install`)
2) criar `.env.local` com:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (ex: `production`)
   - `SANITY_API_TOKEN` (para o webhook de revalidate)
   - `STUDIO_USER` e `STUDIO_PASS` (proteção do `/studio`)
3) subir: `bun run dev` (ou `npm run dev`)

scripts úteis: `bun run lint`, `bun run type-check`, `bun run build`, `bun run analyze`.

## 🗂️ organização rápida
- `app/(site)`: páginas públicas (`/`, `/blog`, posts)
- `app/studio`: Sanity Studio embutido
- `lib/sanity`: config, queries e tipos do CMS
- `components/ui`: micro animações (background, magnetic, etc.)
- `sanity/schemas`: models de `post`, `tag`, `author`, `blockContent`

## 👋 créditos
projeto adaptado a partir do template [Nim](https://github.com/ibelick/nim?tab=readme-ov-file). fui ajustando aos poucos para ficar com a minha cara. :)
