# SkillSwap — Progress Tracker

> **Client Repo:** https://github.com/fahimuntasin/skillswap-client  
> **Server Repo:** https://github.com/fahimuntasin/skillswap-server  
> **Live Link:** https://taskhive-eight-phi.vercel.app/

---

## 🔧 Setup & Initialization

- [x] Create `skillswap-client` Next.js project (TS + Tailwind + React Compiler)
- [x] Install base deps: better-auth, axios, react-hook-form, zod, react-hot-toast, date-fns, lucide-react, shadcn utils
- [x] Install Hero UI / Radix UI deps
- [x] Init shadcn/ui + install components
- [x] Create `skillswap-server` Next.js project
- [x] Install server deps: better-auth, mongoose, stripe
- [x] Setup GitHub remotes + initial pushes (both repos)

---

## 📄 SECTION 04: Layout & Page Structure

### Navbar
- [ ] Public Links: Home, Browse Tasks, Browse Freelancers, Login
- [ ] Private Links: Dashboard, Profile, Logout
- [ ] Responsive mobile menu

### Footer
- [ ] Website Logo with name
- [ ] Navigation links
- [ ] Social media links (X icon, not blue bird)
- [ ] Copyright year text
- [ ] Email/contact info

### All Pages (Public)
- [ ] Home Page
- [ ] Browse Tasks Page
- [ ] Task Details Page
- [ ] Browse Freelancers Page
- [ ] Freelancer Public Profile
- [ ] Login & Register Page
- [ ] Custom 404 Error Page

### All Pages (Private)
- [ ] Client Dashboard: Post Task, My Tasks, Proposals
- [ ] Freelancer Dashboard: My Proposals, Earnings, Profile
- [ ] Admin Dashboard: Manage Users, Manage Tasks, Transactions
- [ ] /payment/success Page (Stripe Return)

---

## 🏠 SECTION 05: Home Page

- [ ] Hero Banner (Title + Subtext + 2 Buttons + Animations)
- [ ] Dynamic: Latest Featured Tasks (6 cards from DB)
- [ ] Dynamic: Top Freelancers (6 cards from DB)
- [ ] Extra Section 1 (Pick one: How It Works / Categories / Statistics / Testimonials / Community)
- [ ] Extra Section 2
- [ ] Smooth animations

---

## 🔐 SECTION 06: Authentication (BetterAuth)

- [ ] Login Page (Email/Password + Google OAuth)
- [ ] Register Page (Name, Email, Image URL, Password, Role)
- [ ] Google OAuth → Auto Client role
- [ ] Form Registration → Manual role select (Client/Freelancer)
- [ ] Password constraints (6+ chars, 1 uppercase, 1 lowercase)
- [ ] Redirects: Client → Home, Freelancer → /dashboard/freelancer, Admin → /dashboard/admin
- [ ] JWT token in HTTPOnly cookie
- [ ] Role-based middleware for /dashboard/* routes
- [ ] 403 Forbidden for wrong role access

---

## 👤 SECTION 07: Client Dashboard

- [ ] Route: /dashboard/client (sidebar layout)
- [ ] Stats: Total Tasks | Open Tasks | In Progress | Total Spent
- [ ] Post Task Form (Title, Category, Description, Budget, Deadline)
- [ ] My Tasks (CRUD + status labels)
- [ ] Edit task (only Open status)
- [ ] Delete task (no accepted proposals)
- [ ] Manage Proposals (view/accept/reject)
- [ ] Accept → Redirect Stripe /payment/checkout
- [ ] Reject → Status = Rejected
- [ ] Only one proposal accepted per task

---

## 👷 SECTION 08: Freelancer Dashboard

- [ ] Route: /dashboard/freelancer (sidebar layout)
- [ ] Stats: Total Proposals | Pending | Accepted | Total Earnings
- [ ] Browse Tasks (open tasks cards + filter)
- [ ] Submit Proposal Form (Task ID, Email, Budget, Days, Note)
- [ ] My Proposals (table filtered by freelancer email)
- [ ] Active Projects (in-progress tasks + submit deliverable modal)
- [ ] Submit Deliverable (URL → mark task Completed)
- [ ] My Earnings (completed tasks table)
- [ ] Edit Profile (Name, Photo, Skills, Bio, Rate)

---

## 🛡️ SECTION 09: Admin Dashboard

- [ ] Route: /dashboard/admin (sidebar layout)
- [ ] Stats: Total Users | Total Tasks | Total Revenue | Active Tasks
- [ ] Manage Users (list + block/unblock)
- [ ] Manage Tasks (list + delete)
- [ ] Transactions History table

---

## 💳 SECTION 10: Payment (Stripe)

- [ ] Stripe Checkout session creation
- [ ] /payment/checkout page
- [ ] /payment/success page (confirmation + task details + dashboard button)
- [ ] Backend /confirm-session endpoint
- [ ] Payment → Task status = In Progress

---

## 🎨 SECTION 11: UI Design

- [ ] Original design (no clone)
- [ ] Consistent fonts, sizing, colors
- [ ] Uniform button styles
- [ ] Equal card heights in grids
- [ ] Balanced color contrast
- [ ] Responsive (mobile/tablet/desktop)
- [ ] X logo (not old bird)
- [ ] Dashboard sidebar with mobile toggle
- [ ] Stats cards / overview numbers
- [ ] Profile summary card in sidebar/header
- [ ] Active route accent colors

---

## 🧪 SECTION 12: Challenges

- [ ] Challenge 1A: Title search bar on Browse Tasks
- [ ] Challenge 1B: Category dropdown filter on Browse Tasks
- [ ] Challenge 1A+B: Search + filter work together
- [ ] Challenge 2: JWT + HTTPOnly cookie + role middleware + 403
- [ ] Challenge 3: Server-side pagination (9 per page) + Next/Prev buttons

---

## 🗄️ SECTION 13: MongoDB Collections

- [ ] **users** — name, email, image, role, skills, bio, isBlocked, createdAt
- [ ] **tasks** — title, category, description, budget, deadline, client_email, status, deliverable_url, createdAt
- [ ] **proposals** — task_id, freelancer_email, proposed_budget, estimated_days, cover_note, status, submitted_at
- [ ] **payments** — client_email, freelancer_email, task_id, amount, transaction_id, payment_status, paid_at
- [ ] **reviews** — task_id, reviewer_email, reviewee_email, rating, comment, created_at

---

## 🌟 SECTION 14: Optional (Bonus)

- [ ] Dark/Light theme toggle
- [ ] Real-time notifications
- [ ] Task bookmarking
- [ ] Freelancer verification badge
- [ ] Client rating system

---

## 📦 SECTION 15: Submission Checklist

- [ ] Admin Email: admin1@taskhive.com / Password: admin1@taskhive.com
- [ ] Live site deployed
- [ ] 20+ git commits (client)
- [ ] 15+ git commits (server)
- [ ] README.md (project name, purpose, live link, features, packages)
- [ ] All env keys in .env.local (frontend)
- [ ] MongoDB credentials in env (backend)
- [ ] BetterAuth secrets in env
- [ ] Fully responsive
- [ ] Professional UI/UX
- [ ] No copied text/projects
- [ ] Error messages on all forms/endpoints/routes
- [ ] No page reload bugs

---

## 📊 Commit Counter

| Repo | Count | Target |
|------|-------|--------|
| Client | 1 | 20 |
| Server | 0 | 15 |
