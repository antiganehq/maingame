# AGENTS.md

# maingame.fun — AI Agent Rules

This file defines permanent rules for all AI agents working on maingame.fun.

All agents must read this file before making changes.

---

## 1. Product Identity

maingame.fun is a marketplace that connects Game Developers and Streamers.

The product is not a generic game catalog.
The product is not a crypto-first platform.
The product is not a streaming platform.

It is a paid campaign marketplace where:

- GameDev pays streamers to promote/play games.
- Streamers discover paid game campaigns.
- Public users discover games through live/scheduled streams.

---

## 2. Core MVP Loop

The MVP must focus on this core loop:

GameDev creates game
→ GameDev chooses streamer
→ GameDev creates campaign offer
→ GameDev funds campaign escrow using Dots
→ Streamer accepts campaign
→ Streamer streams the game
→ Streamer submits live/archive link
→ GameDev approves completion
→ Streamer receives Dots

Any feature that does not support this loop is secondary.

---

## 3. Architecture

This project uses a monorepo.

Required structure:

```txt
apps/
  web/      Public app for maingame.fun
  pro/      Private dashboard app for pro.maingame.fun
  api/      Backend API for api.maingame.fun

packages/
  ui/          Shared UI components
  db/          Prisma schema and database client
  types/       Shared TypeScript types
  validators/  Shared Zod schemas
  brand/       Shared brand constants and copy
  config/      Shared config
  utils/       Shared utilities
```

---

## 4. App Responsibilities

## apps/web

Public-facing app.

Domain:
maingame.fun

Responsibilities:

- Landing page
- Public game catalog
- Public game detail pages
- Public streamer pages
- Public stream schedule
- Public stream archive
- SEO and marketing pages

Must not contain private dashboard logic.

---

## apps/pro

Private authenticated app.

Domain:
pro.maingame.fun

Responsibilities:

- Login
- Onboarding
- GameDev dashboard
- Streamer dashboard
- Campaign management
- Dots wallet
- Profile management
- Admin dashboard

Must require authentication for private routes.

---

## apps/api

Backend API.

Domain:
api.maingame.fun

Responsibilities:

- Business logic
- Database writes
- Campaign creation
- Campaign escrow
- Dots ledger
- Payment/top-up handling
- Admin operations
- Public read APIs
- Private authenticated APIs

Frontend apps must not directly implement sensitive business logic.

---

## 5. Technology Rules

Use:

- pnpm
- Turborepo
- TypeScript
- Next.js
- Hono
- Supabase PostgreSQL
- Prisma
- Privy
- Tailwind CSS
- shadcn/ui
- Zod

Do not use:

- Supabase Auth for MVP
- crypto token logic
- subscription billing
- blockchain smart contracts
- complex microservices
- unnecessary state management libraries
- unnecessary background job systems before needed

---

## 6. Authentication Rule

Privy is the source of authentication and embedded wallet identity.

Supabase is not used for authentication in MVP.

Supabase is used for:

- PostgreSQL database
- optional storage for images and proof uploads

---

## 7. Dots Rule

Dots is internal platform credit.

Dots is not a crypto token in MVP.

Do not implement:

- token minting
- blockchain wallet transfers
- on-chain ledger
- tokenomics
- crypto trading
- staking
- NFT features

All Dots operations must be represented in the database ledger.

Every Dots balance change must have a transaction record.

---

## 8. Payment Rule

For MVP, QRIS/top-up may be manual or semi-manual.

Payment provider integration can be added later.

MVP payment flow:

1. GameDev creates top-up request.
2. Admin reviews payment proof.
3. Admin approves top-up.
4. Dots are credited to GameDev.
5. GameDev funds campaign escrow.
6. Dots are released to Streamer after campaign completion.

---

## 9. Business Logic Rule

Sensitive actions must happen in apps/api.

Examples:

- funding campaign escrow
- releasing streamer payout
- refunding campaign
- approving top-up
- changing campaign status
- changing wallet balance

Do not perform these directly from frontend apps.

---

## 10. Code Quality Rules

All code must be:

- typed
- readable
- modular
- minimal
- reusable where appropriate

Prefer:

- server-side validation
- shared Zod schemas
- shared TypeScript types
- explicit database transactions
- small components
- clear file names

Avoid:

- overengineering
- unrelated features
- large files
- duplicated business logic
- hardcoded secrets
- fake production logic

---

## 11. MVP Priority

Build in this order:

1. Foundation
2. Auth and onboarding
3. Profiles
4. Game catalog
5. Streamer catalog
6. Campaign offers
7. Scheduling
8. Dots ledger
9. Escrow and payout
10. Public discovery
11. Admin tools
12. QA and launch

---

## 12. Do Not Build Yet

Do not build these unless explicitly requested:

- AI streamer matching
- recommendation engine
- crypto token
- blockchain integration
- Twitch API integration
- YouTube API integration
- real-time chat
- complex questionnaire builder
- affiliate system
- subscription plan
- NFT badges
- advanced analytics
- mobile app
- native desktop app

---

## 13. Database Rule

Use Prisma in packages/db.

Supabase PostgreSQL is the database provider.

All database schema changes must be done through Prisma schema and migrations.

---

## 14. Environment Variables

Never hardcode secrets.

Use `.env.example` for required variables.

Expected variables:

```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_WEB_URL=http://localhost:3000
NEXT_PUBLIC_PRO_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8787

PRIVY_APP_ID=
PRIVY_APP_SECRET=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=

QRIS_PROVIDER=
PAYMENT_WEBHOOK_SECRET=
```

---

## 15. Agent Output Rule

After completing a task, always report:

- what was changed
- files created
- files modified
- commands to run
- how to test
- known limitations
- recommended next task

---

## 16. Product Tone

maingame.fun should feel:

- playful
- creator-friendly
- modern
- trustworthy
- simple
- game-native

Avoid overly corporate language.

Preferred positioning:

"Where Game Developers meet Streamers."

Alternative:
"Launch your game through creators."
"Find streamers to play your game."
"Get paid to stream new games."

---

## 17. Final Reminder

Do not change the product direction without explicit instruction.

Do not merge public app, pro app, and API into one app.

Do not replace Privy with Supabase Auth.

Do not treat Dots as crypto token.

Do not build features outside the assigned task.
