# NexaIT Studio

Premium digital solutions portfolio website built with modern 2026 design system aesthetics.

## Features

- **Next.js 15+ App Router** with React 19
- **i18n Support**: Full Arabic (RTL) and English (LTR) utilizing `next-intl`
- **Modern UI**: Tailwind CSS v4, Framer Motion animations, Glassmorphism, and responsive design
- **Dark/Light Mode**: Persisted theme toggle (system preference fallback)
- **Dynamic Content**: CMS-ready structures for projects, reviews, and services
- **Contact & Lead Gen**: Supabase integration for contact form submissions with localStorage fallback
- **SEO Optimized**: Dynamic `sitemap.xml`, `robots.txt`, and per-page metadata

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Sonner](https://sonner.emilkowal.ski/)

## Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase Project (for backend lead generation)

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

To use the contact form, ensure you create a `leads` table in your Supabase database with the following structure:

- `id` (uuid, primary key)
- `name` (text)
- `email` (text, nullable)
- `phone` (text)
- `service` (text)
- `message` (text)
- `created_at` (timestamp, default now())

Disable RLS or configure appropriate insert policies for anonymous users.

## Local Development

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000)

## Production Build

To build the project for production:

```bash
npm run build
npm start
```

## Structure

- `src/app`: Next.js App Router and pages
- `src/components`: Reusable UI components and layouts
- `src/i18n`: next-intl configuration
- `src/messages`: Translation dictionaries (en.json, ar.json)
- `src/lib`: Utilities and Supabase client
