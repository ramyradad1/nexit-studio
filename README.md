# NexaIT Studio — Portfolio Website (Next.js + Tailwind + Supabase)

A modern, bilingual (EN/AR) portfolio website for **NexaIT Studio** showcasing IT services, web/app development, projects, and customer reviews — with a working Contact form that stores leads in **Supabase**.  
Deployment is optimized for **GitHub + Vercel**.

---

## ✨ Features

- **Next.js App Router + TypeScript**
- **TailwindCSS** UI (modern, responsive)
- **Bilingual i18n:** English (LTR) + Arabic (RTL)
- **Light/Dark Theme Toggle** (persisted)
- Pages:
  - `/` Home
  - `/services`
  - `/projects`
  - `/projects/[slug]`
  - `/reviews`
  - `/about`
  - `/contact`
- **Floating WhatsApp CTA** on all pages
- **Contact Form → Supabase** (`leads` table)
- SEO basics:
  - per-page metadata
  - `robots.txt` + `sitemap.xml`

---

## 🧰 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS
- **Backend/DB:** Supabase (Postgres + RLS)
- **Hosting:** Vercel
- **Repo:** GitHub

---

## ✅ Prerequisites

- Node.js **18+** (recommended 20+)
- A Supabase project (free tier is OK)

---

## 🚀 Getting Started (Local)

1) **Clone**
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <PROJECT_FOLDER>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
