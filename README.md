# SkillSwap Client

Frontend for SkillSwap — Freelance Micro-Task Platform. Built with **Next.js 16**, **Tailwind v4**, **shadcn/ui**, and **BetterAuth**.

## Tech Stack

- Next.js 16 (Turbopack)
- Tailwind CSS v4 with dark mode
- shadcn/ui components + Base UI
- BetterAuth client SDK
- Stripe Checkout integration
- Lucide Icons + Heroicons
- next-themes for dark/light toggle
- Framer Motion (via Tailwind animations)

## Pages

- `/` — Landing page (hero, tabs, features, CTA)
- `/tasks` — Browse tasks with search, filter, server pagination
- `/tasks/[id]` — Task detail + submit proposal
- `/freelancers` — Browse freelancers
- `/freelancers/[id]` — Freelancer public profile
- `/login` — Login (email + Google OAuth)
- `/register` — Register with role selection
- `/dashboard/client` — Client dashboard
- `/dashboard/freelancer` — Freelancer dashboard
- `/dashboard/admin` — Admin dashboard
- `/payment/success` — Payment confirmation
- 404 — Custom not found page

## Features

- 🌙 Dark/light theme toggle with localStorage persistence
- 🔐 BetterAuth email/password + Google OAuth
- 📊 Role-based dashboards (client, freelancer, admin)
- 💳 Stripe checkout integration
- 🔍 Task search + category filter + server-side pagination
- ⭐ Freelancer ratings and reviews
- 📱 Fully responsive
- 🎨 Toptal/Vercel editorial design

## Getting Started

```bash
npm install
npm run dev
```

Server must be running on `localhost:3002` (API proxy via next.config.ts).
