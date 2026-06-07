# ARCHITECTURE.md

This document defines the technical architecture for maingame.fun. It exists to keep future work from collapsing the project into one large Next.js app.

## Architecture Summary

maingame.fun is a pnpm + Turborepo monorepo with three deployable apps and shared internal packages.

```txt
apps/
  web/      Public discovery app
  pro/      Private authenticated dashboard
  api/      Backend API and business logic

packages/
  ui/          Shared UI primitives
  db/          Prisma schema, Prisma client, Supabase helpers
  types/       Shared TypeScript domain types
  validators/  Shared Zod validation schemas
  brand/       Shared brand constants, URLs, copy, navigation
  config/      Shared TypeScript, ESLint, Tailwind/PostCSS config
  utils/       Shared pure utilities
```

## Deployment Domains

| Domain | App | Purpose |
| --- | --- | --- |
| `maingame.fun` | `apps/web` | Public discovery, SEO, game pages, streamer pages, stream archives |
| `pro.maingame.fun` | `apps/pro` | Private GameDev, Streamer, and Admin dashboard |
| `api.maingame.fun` | `apps/api` | API, auth verification, business logic, database writes |

Local defaults:

| Local URL | App |
| --- | --- |
| `http://localhost:3000` | `apps/web` |
| `http://localhost:3001` | `apps/pro` |
| `http://localhost:8787` | `apps/api` |

## Why Apps Are Separated

### Public and private surfaces are different products

`apps/web` is for public discovery. It should optimize for public browsing, SEO, and low-friction game/streamer discovery.

`apps/pro` is for authenticated workflows. It contains dashboards, onboarding, game management, campaign management, Dots wallet UI, and admin interfaces when requested.

Keeping them separate prevents private dashboard state, auth assumptions, and heavy workflow code from leaking into the public app.

### API owns sensitive business logic

`apps/api` is the only place for sensitive mutations:

- campaign lifecycle changes
- Dots ledger changes
- escrow hold/release/refund
- streamer payout release
- top-up approval
- admin actions
- authorization checks

Frontend apps must not directly implement these workflows. They call the API.

### Deployment can scale independently

Separate apps allow public pages, private dashboard, and API runtime to be deployed, cached, monitored, and scaled independently.

## App Responsibilities

## apps/web

Technology: Next.js App Router, TypeScript, Tailwind CSS.

Responsibilities:

- public homepage
- public game catalog
- public game detail pages
- public streamer profile pages
- public "streaming today" page
- public stream archive pages
- SEO/metadata for public discovery

Allowed imports:

- `@maingame/ui`
- `@maingame/brand`
- `@maingame/types`
- `@maingame/validators`
- `@maingame/utils`

Rules:

- no private dashboard workflows
- no sensitive database writes
- no direct Dots ledger logic
- no escrow or payout logic
- call `apps/api` for backend reads/writes

## apps/pro

Technology: Next.js App Router, TypeScript, Tailwind CSS, Privy.

Responsibilities:

- Privy login UI
- authenticated onboarding
- GameDev dashboard
- Streamer dashboard
- game management UI
- campaign management UI
- Dots wallet UI
- profile settings UI
- admin UI when explicitly requested

Allowed imports:

- `@maingame/ui`
- `@maingame/brand`
- `@maingame/types`
- `@maingame/validators`
- `@maingame/utils`

Rules:

- private routes require authentication
- send Privy-authenticated requests to `apps/api`
- do not perform campaign settlement directly
- do not mutate Dots balances directly
- do not connect directly to Supabase for business writes

## apps/api

Technology: Hono, TypeScript, Prisma, Supabase PostgreSQL.

Responsibilities:

- HTTP API for public and private apps
- request validation
- Privy auth/session verification
- authorization checks
- database reads and writes
- campaign lifecycle transitions
- Dots ledger entries
- escrow funding, release, and refund
- top-up approval
- payout release
- admin operations

Allowed imports:

- `@maingame/db`
- `@maingame/types`
- `@maingame/validators`
- `@maingame/brand`
- `@maingame/utils`

Rules:

- validate inputs at the API boundary
- wrap Dots/escrow operations in database transactions
- keep every Dots balance change ledgered
- never treat Dots as crypto
- never use Supabase Auth

## Shared Package Responsibilities

## packages/ui

Shared UI primitives and shadcn/ui-compatible components.

Rules:

- no app-specific business logic
- no API calls
- no database code
- no Privy-specific logic unless a reusable auth UI primitive is explicitly needed

## packages/db

Prisma schema, Prisma client, and Supabase server helpers.

Responsibilities:

- `prisma/schema.prisma`
- Prisma Client setup
- Supabase server client helper if storage/service-role access is needed

Rules:

- schema changes go through Prisma
- migrations are owned here
- do not put campaign workflow logic here; keep workflows in `apps/api`

## packages/types

Shared TypeScript types and enums.

Use for:

- roles
- statuses
- shared DTO shapes
- domain enum values

Rules:

- no runtime business logic
- avoid duplicating Prisma-generated types unless needed for API/frontends

## packages/validators

Shared Zod schemas.

Use for:

- API request inputs
- form validation
- shared schema-derived TypeScript types

Rules:

- schemas should describe input shape
- authorization and side effects stay in `apps/api`

## packages/brand

Shared brand constants.

Use for:

- app name
- domain URLs
- tagline
- navigation constants
- product copy

## packages/config

Shared project configuration.

Use for:

- TypeScript base configs
- ESLint configs
- Tailwind/PostCSS config

## packages/utils

Pure shared utility functions.

Rules:

- no framework-specific code unless truly shared
- no database access
- no secrets
- no app-specific side effects

## Request Flow

Public read flow:

```txt
User browser
  -> maingame.fun / apps/web
  -> api.maingame.fun / apps/api when data is needed
  -> Prisma
  -> Supabase PostgreSQL
```

Private workflow flow:

```txt
Authenticated browser
  -> pro.maingame.fun / apps/pro
  -> api.maingame.fun / apps/api
  -> Privy auth verification
  -> Zod validation
  -> Prisma transaction when needed
  -> Supabase PostgreSQL
```

Sensitive actions always go through `apps/api`.

## Auth Flow

Privy is the auth provider.

Expected flow:

1. User signs in through Privy in `apps/pro`.
2. `apps/pro` receives Privy-authenticated session identity.
3. `apps/pro` sends authenticated API requests to `apps/api`.
4. `apps/api` verifies the Privy identity/session.
5. `apps/api` maps the Privy user ID to the local `User` record.
6. `apps/api` performs authorization checks before reads/writes.

Rules:

- do not use Supabase Auth
- do not store auth secrets in frontend apps
- do not trust frontend-provided role or balance values

## Database Flow

Supabase provides PostgreSQL.

Prisma owns:

- schema
- migrations
- typed client access

Expected write flow:

```txt
apps/pro or apps/web
  -> apps/api route
  -> Zod validation
  -> Privy identity verification
  -> authorization check
  -> Prisma write or transaction
  -> Supabase PostgreSQL
```

Dots/escrow writes must use database transactions and ledger entries.

## Dots Architecture

Dots is internal platform credit only.

Dots operations are API-owned:

- top-up credit
- escrow hold
- escrow release
- campaign payout
- refund
- platform fee
- manual adjustment

Rules:

- no token logic
- no blockchain transfers
- no on-chain ledger
- every balance change requires a database ledger entry

## Configuration and Environment

Root `.env.example` documents required variables.

Important variable groups:

- app URLs
- API port/CORS origins
- Supabase PostgreSQL `DATABASE_URL`
- Prisma migration `DIRECT_URL`
- Supabase optional storage/client variables
- Privy app ID and secret

Secrets must not be hardcoded.

## Non-Goals

Do not add these as part of architecture unless explicitly requested:

- one giant Next.js app
- Supabase Auth
- crypto token services
- smart contracts
- Twitch/YouTube API integrations
- advanced AI matching service
- subscription billing
- microservices beyond the current API
- mobile or desktop apps
