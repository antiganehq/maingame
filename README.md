# maingame.fun

maingame.fun is a marketplace that connects Game Developers and Streamers through paid campaign offers funded with internal Dots credit.

Read these first before feature work:

- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `MVP_SCOPE.md`

## Stack

- pnpm workspaces
- Turborepo
- TypeScript
- Next.js for `apps/web` and `apps/pro`
- Hono for `apps/api`
- Supabase PostgreSQL
- Prisma
- Privy auth
- Tailwind CSS
- shadcn/ui-compatible shared UI
- Zod

## Repo Structure

```txt
apps/
  web/      Public app for maingame.fun
  pro/      Private dashboard app for pro.maingame.fun
  api/      Backend API for api.maingame.fun

packages/
  ui/          Shared UI primitives
  db/          Prisma schema, Prisma client, Supabase helpers
  types/       Shared TypeScript types
  validators/  Shared Zod schemas
  brand/       Shared brand constants and copy
  config/      Shared TypeScript, ESLint, Tailwind/PostCSS config
  utils/       Shared utilities
```

## Local Setup

Requirements:

- Node.js 20.9+
- pnpm 10+
- Supabase PostgreSQL database
- Privy app credentials

Install dependencies:

```bash
pnpm install
```

Create local env:

```bash
cp .env.example .env
```

Fill in at least:

```env
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=
```

## Database

Generate Prisma Client:

```bash
pnpm db:generate
```

Run local development migrations:

```bash
pnpm db:migrate
```

Seed command:

```bash
pnpm db:seed
```

Creates demo data for local development:
- 1 GameDev (Nusantara Games) with 15,000 Dots balance
- 3 Streamers (BayuPlays, MeiCasts, DimasArena)
- 2 Published games (Wayward Warriors, Kopi & Kata)
- 1 Scheduled campaign with escrow hold
- 1 Completed campaign with full ledger, archive, and questionnaire response

## Development

Start all apps:

```bash
pnpm dev
```

Local URLs:

- Web: `http://localhost:3000`
- Pro: `http://localhost:3001`
- API: `http://localhost:8787`
- API health: `http://localhost:8787/health`

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Rules

- Keep `apps/web`, `apps/pro`, and `apps/api` separated.
- Put sensitive business logic in `apps/api`.
- Use Privy for auth, not Supabase Auth.
- Use Supabase PostgreSQL through Prisma.
- Treat Dots as internal platform credit only.
- Do not add crypto token logic for MVP.
