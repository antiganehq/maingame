# maingame.fun

maingame.fun is a marketplace that connects game developers with streamers through paid Dots-funded campaign offers.

This repository is the foundation monorepo. It does not implement the full product yet.

## Apps

- `apps/web`: public maingame.fun app.
- `apps/pro`: private pro.maingame.fun dashboard app.
- `apps/api`: backend API for api.maingame.fun.

## Packages

- `packages/ui`: shared UI primitives.
- `packages/db`: Prisma schema, Prisma client setup, and Supabase PostgreSQL connection helpers.
- `packages/types`: shared TypeScript enums and domain types.
- `packages/validators`: shared Zod validation schemas.
- `packages/brand`: app name, URLs, tagline, navigation, and brand copy.
- `packages/config`: shared TypeScript, ESLint, and Tailwind configuration.
- `packages/utils`: shared utility functions.

## Local Setup

Requirements:

- Node.js 20.9 or newer.
- pnpm 10 or newer.
- Supabase PostgreSQL connection string for database work.

Install dependencies:

```bash
pnpm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Start all apps through Turborepo:

```bash
pnpm dev
```

Default local URLs:

- Public app: `http://localhost:3000`
- Pro app: `http://localhost:3001`
- API: `http://localhost:8787`
- Health check: `http://localhost:8787/health`

## Useful Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm db:generate
pnpm db:migrate
```

## Environment

`DATABASE_URL` should point to the Supabase PostgreSQL pooled connection URL when possible. `DIRECT_URL` should point to the direct database URL for Prisma migrations.

Auth is expected to use Privy. Supabase Auth is intentionally not part of this project.
