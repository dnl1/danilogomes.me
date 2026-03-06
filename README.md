# Personal Portfolio (Engineering + Music)

Minimal, content-driven personal portfolio built with **Next.js App Router**, **TypeScript**, **TailwindCSS**, and **MDX**.

Designed for:

- static generation and low hosting cost
- SEO and social previews
- easy content maintenance via local MDX files
- fast loading on desktop and mobile

## Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- MDX content files
- SSG-first routing
- Vercel deployment ready

## Repository structure

```text
.
├── app
│   ├── about/page.tsx
│   ├── blog
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── contact/page.tsx
│   ├── feed.xml/route.ts
│   ├── manifest.ts
│   ├── music
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── opengraph-image.tsx
│   ├── projects
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── twitter-image.tsx
├── components
│   ├── blog-card.tsx
│   ├── container.tsx
│   ├── footer.tsx
│   ├── mdx.tsx
│   ├── music-card.tsx
│   ├── navbar.tsx
│   ├── project-card.tsx
│   └── theme-toggle.tsx
├── content
│   ├── blog
│   │   └── first-post.mdx
│   ├── music
│   │   └── dnl1-project.mdx
│   └── projects
│       ├── accumulator-engine.mdx
│       └── loader-performance.mdx
├── lib
│   ├── content.ts
│   ├── metadata.ts
│   ├── site.ts
│   └── utils.ts
├── public/images
│   ├── blog/first-post.svg
│   ├── music/dnl1-project.svg
│   ├── projects/accumulator-engine.svg
│   ├── projects/loader-performance.svg
│   └── og-default.svg
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Pages

- `/` Home
- `/about`
- `/projects`
- `/projects/[slug]`
- `/music`
- `/music/[slug]`
- `/blog`
- `/blog/[slug]`
- `/contact`

## MDX content model

Each content file under `content/projects`, `content/music`, and `content/blog` uses frontmatter:

```mdx
---
title:
description:
date:
tags:
image:
---
```

Additional fields can be used per section (for example: `company`, `techStack`, `spotifyUrl`).

## Features included

- Dark theme (default) with toggle
- Responsive layout
- SEO metadata per route
- OpenGraph and Twitter metadata
- Dynamic OG/Twitter image generation
- `sitemap.xml` via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts`
- RSS feed at `/feed.xml`
- Syntax highlighting for code blocks in MDX
- Vercel Analytics + Speed Insights integration
- Skip link, stronger keyboard focus states, and reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Build and production preview

```bash
npm run lint
npm run build
npm run start
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep default framework preset (Next.js).
4. Set environment variables only if you add integrations later.
5. Deploy.

For custom domain and analytics, configure directly in the Vercel project settings.

## Personalization checklist

- Update `lib/site.ts` with your real name, links, URL, and contact email.
- Replace placeholder images in `public/images`.
- Add real case studies and posts in `content/*`.
- Replace sample Spotify/SoundCloud/YouTube embeds in `content/music/*.mdx`.
