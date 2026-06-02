# Architecture

## Monorepo

The repository uses pnpm workspaces and Turborepo.

```text
apps/
  web/   Public maingame.fun app
  pro/   Private pro.maingame.fun dashboard app
  api/   Backend API for api.maingame.fun
packages/
  ui/
  db/
  types/
  validators/
  brand/
  config/
  utils/
```

## Frontend

`apps/web` and `apps/pro` are separate Next.js apps using the App Router and Tailwind CSS.

The frontend may import shared presentation primitives, constants, types, validators, and pure utilities from `packages/*`.

The frontend must not directly implement campaign settlement, Dots transfers, escrow logic, or approval logic. Those belong in `apps/api`.

## Backend

`apps/api` is a Hono service. It owns business workflows, validation boundaries, authorization checks, database writes, and future integrations.

## Data

Supabase provides PostgreSQL. Prisma owns schema and migrations from `packages/db`.

`DATABASE_URL` is used by Prisma Client at runtime. `DIRECT_URL` is used for migrations.

## Auth

Privy is the auth provider. Supabase Auth is intentionally not used.
