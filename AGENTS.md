# AGENTS.md

This is the first file every AI agent must read before changing this repository.

Also read `PROJECT_CONTEXT.md` before planning or implementation work.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Product Identity

maingame.fun is a marketplace that connects Game Developers and Streamers.

The product is:

- a paid campaign marketplace for games and creators
- a place for Game Developers to fund streamer campaigns
- a place for Streamers to discover paid game campaigns
- a public discovery surface for games being streamed

The product is not:

- a generic game catalog
- a streaming platform
- a crypto-first app
- a token launch project
- a subscription SaaS product
- an AI matching product in the MVP

Do not change product direction without explicit user instruction.

## MVP Loop

The MVP must prove this loop:

1. GameDev creates a studio profile.
2. GameDev creates a game.
3. GameDev chooses a streamer.
4. GameDev creates a campaign offer.
5. GameDev funds campaign escrow using Dots.
6. Streamer accepts the campaign.
7. Streamer streams the game.
8. Streamer submits live/archive link.
9. GameDev approves completion.
10. Streamer receives Dots.

Any feature that does not directly support this loop is secondary.

## Monorepo Architecture

Use pnpm workspaces and Turborepo.

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
  brand/       Shared brand constants, copy, and assets
  config/      Shared TypeScript, ESLint, and Tailwind config
  utils/       Shared utilities
```

Do not merge the public app, pro app, and API into one app.

## App Responsibilities

### apps/web

Public app for `maingame.fun`.

Allowed responsibilities:

- public homepage
- public game catalog
- public game detail pages
- public streamer pages
- public "streaming today" view
- public stream archive pages
- SEO and marketing pages

Rules:

- must not contain private dashboard workflows
- must not perform sensitive writes directly
- must call `apps/api` for backend data and actions

### apps/pro

Private dashboard app for `pro.maingame.fun`.

Allowed responsibilities:

- Privy login UI
- onboarding flows
- GameDev dashboard
- Streamer dashboard
- game management UI
- campaign management UI
- Dots wallet UI
- profile management UI
- admin UI when explicitly requested

Rules:

- private routes must require authentication
- must not implement sensitive business logic directly
- must call `apps/api` for campaign, Dots, escrow, payout, and approval actions

### apps/api

Backend API for `api.maingame.fun`.

Required responsibilities:

- business logic
- authorization checks
- validation boundaries
- database writes
- campaign lifecycle changes
- Dots ledger changes
- escrow funding
- payout release
- refunds
- top-up/admin approval logic
- public read APIs
- private authenticated APIs

Sensitive business logic belongs here, not in frontend apps.

## Technology Rules

Use:

- pnpm
- Turborepo
- TypeScript
- Next.js for `apps/web` and `apps/pro`
- Hono for `apps/api`
- Supabase PostgreSQL
- Prisma
- Privy
- Tailwind CSS
- shadcn/ui-compatible shared UI
- Zod

Avoid:

- unnecessary services
- unnecessary state management libraries
- background job systems before they are needed
- unrelated refactors during feature tasks
- hardcoded secrets
- fake production logic that hides missing backend work

## Auth Rules

Privy is the auth provider for the MVP.

Use Privy for:

- user authentication
- embedded wallet identity
- authenticated session identity passed to the API

Do not use Supabase Auth.

Do not replace Privy with another auth provider unless explicitly requested.

## Database Rules

Supabase is used as PostgreSQL database infrastructure.

Use Supabase for:

- PostgreSQL database
- optional storage for images, proof uploads, or similar assets

Use Prisma for:

- schema definition
- migrations
- typed database access

Rules:

- Prisma schema lives in `packages/db`.
- Database access helpers live in `packages/db`.
- Schema changes must go through Prisma schema and migrations.
- Frontend apps must not bypass API-owned business rules with direct database writes.

## Dots Rules

Dots is internal platform credit only.

Dots is not:

- a crypto token
- an SPL token
- an ERC-20 token
- on-chain money
- a tradable asset
- a staking or rewards token

Do not implement:

- token minting
- blockchain wallet transfers
- on-chain ledgers
- tokenomics
- staking
- NFT features
- crypto trading

All Dots balance changes must be recorded in the database ledger.

Dots operations such as top-up credit, escrow hold, escrow release, payout, refund, and manual adjustment must happen through `apps/api`.

## Payment Rules

For MVP, top-ups may be manual or semi-manual.

Preferred MVP flow:

1. GameDev creates top-up request.
2. GameDev submits payment proof.
3. Admin reviews payment proof.
4. Admin approves top-up.
5. API credits Dots to GameDev ledger.
6. GameDev funds campaign escrow using Dots.
7. API releases Dots to Streamer after GameDev approval.

Do not add subscription billing unless explicitly requested.

## Do Not Build Yet

Do not build these unless explicitly requested:

- crypto token logic
- blockchain integration
- smart contracts
- token launch mechanics
- NFT badges
- subscription plans
- advanced AI matching
- recommendation engine
- Twitch API integration
- YouTube API integration
- full chat system
- complex questionnaire builder
- advanced analytics
- mobile app
- desktop app
- multi-service architecture

## Code Rules

Keep work small and aligned to the assigned task.

Prefer:

- TypeScript everywhere
- shared Zod schemas in `packages/validators`
- shared domain types in `packages/types`
- shared brand constants in `packages/brand`
- reusable UI primitives in `packages/ui`
- explicit database transactions for money/Dots operations
- clear names and small files

Do not:

- add unrelated product features
- duplicate business logic across frontend apps
- leak secrets into source files
- move sensitive logic out of `apps/api`
- change app boundaries for convenience

## Environment Rules

Never hardcode secrets.

Document required variables in `.env.example`.

Important variable families:

- app URLs
- API port/CORS
- Supabase PostgreSQL `DATABASE_URL`
- Prisma migration `DIRECT_URL`
- Supabase optional storage/client variables
- Privy app ID and secret
- future payment webhook secrets when payments are added

## Agent Completion Report

After completing a task, report:

- files changed
- commands to run
- how to test
- known limitations, if any
- recommended next task

## Final Reminder

Do not change the product direction.

Do not merge `apps/web`, `apps/pro`, and `apps/api`.

Do not replace Privy with Supabase Auth.

Do not treat Dots as crypto.

Do not build outside the assigned task.
