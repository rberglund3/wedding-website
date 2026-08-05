# Rita & Wesley's Wedding Website

A wedding website built with Next.js, Tailwind CSS, and Supabase.

**Live site:** [wedding-website-mu-nine.vercel.app](https://wedding-website-mu-nine.vercel.app/)

## Pages

- **Home** — landing page
- **Details** — date, venue, and dress code
- **Travel & Stay** — hotel room block, alternatives, and nearby airports
- **Gallery** — photo stack
- **Registry** — Venmo fund
- **RSVP** — guest lookup and response form (backed by Supabase; guests are looked up by name via a locked-down RPC function rather than direct table access)

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) for the RSVP data

## Running locally

1. Clone the repo and install dependencies

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your Supabase project's URL and anon key (found in your Supabase dashboard under Project Settings > API):

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Start the dev server

   ```bash
   npm run dev
   ```

   The site will be running at [localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — lint the project
