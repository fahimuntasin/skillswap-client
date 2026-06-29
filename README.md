# SkillSwap — Freelance Micro-Task Platform

**Live site:** [https://skillswap-two-psi.vercel.app](https://skillswap-two-psi.vercel.app)

SkillSwap is a marketplace where **clients** post small tasks and **freelancers** apply with proposals. Clients hire via Stripe Checkout; admins manage users and tasks.

## Purpose

A full-stack freelancing platform demonstrating authentication, role-based access, CRUD, Stripe payments, search/filter, pagination, and deployment — built for assignment **A10_CAT-011**.

## Key Features

- Better Auth — email/password + Google OAuth (Google accounts are **Client** role per spec)
- Role dashboards: Client, Freelancer, Admin
- Stripe Checkout + payment confirmation
- Browse tasks: title search, category filter, server pagination (9 per page)
- JWT session cookies + `/dashboard/*` middleware guards + API **403** on wrong role
- Home page: live featured tasks, top freelancers, platform statistics
- Dark/light theme, task bookmarks, notifications, freelancer verification badge

## Tech Stack & Packages

| Package | Use |
|---------|-----|
| next | App framework |
| react / react-dom | UI |
| tailwindcss | Styling |
| better-auth | Authentication |
| @better-auth/mongo-adapter | Auth database |
| mongodb / mongoose | Data |
| stripe | Payments |
| next-themes | Dark mode |
| lucide-react | Icons |
| shadcn/ui | Components |
| sonner | Toasts |
| gsap | Animations |

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin1@taskhive.com | admin1@taskhive.com |

Seed admin only: `npx tsx src/scripts/seed.ts`

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

- `MONGODB_URI` — MongoDB connection
- `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` — Better Auth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe
- `NEXT_PUBLIC_CLIENT_URL` — deployed frontend URL

## Auth Rules (Assignment Spec)

- **Login:** Clients → home `/`; Freelancers & Admins → dashboard
- **Register:** Freelancer only via email form + role selection; Google → always Client
- **Google OAuth:** Creates Client account only
