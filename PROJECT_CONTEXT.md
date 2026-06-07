# PROJECT_CONTEXT.md

Use this file as product context for every engineering task and ClickUp ticket.

## Product Summary

maingame.fun is a marketplace that connects Game Developers with Streamers through paid game-streaming campaigns.

The MVP is not a generic game catalog, streaming platform, crypto product, subscription product, or AI matching product.

## User Types

### Game Developer

Needs to register a studio, list games, browse streamers, create campaign offers, fund campaigns with Dots, schedule streams, and approve completed streams.

### Streamer

Needs to register a creator profile, browse games, receive campaign offers, accept or reject campaigns, stream games, submit live/archive links, and receive Dots after approval.

### Public User

Needs to browse games, see what is being streamed today, view game and streamer pages, and watch public stream archives.

### Admin

Needs to review top-ups, monitor campaigns, moderate content, resolve disputes, and make manual ledger adjustments when required.

## MVP Goal

Prove that a GameDev can pay a Streamer to stream a game through maingame.fun using internal Dots credit.

## Core MVP Loop

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

Build around this loop first.

## Product Domains

### maingame.fun

Public discovery app in `apps/web`.

Owns public pages only:

- homepage
- game catalog
- game detail pages
- streamer profile pages
- streaming today page
- public stream archive pages

### pro.maingame.fun

Private authenticated dashboard in `apps/pro`.

Owns private user workflows:

- Privy login UI
- onboarding
- GameDev dashboard
- Streamer dashboard
- game management UI
- campaign management UI
- Dots wallet UI
- profile settings UI
- admin UI when explicitly requested

### api.maingame.fun

Backend API in `apps/api`.

Owns sensitive product logic:

- auth/session verification
- validation
- database writes
- campaign lifecycle transitions
- Dots ledger changes
- escrow hold/release/refund
- top-up approval
- payout release
- admin operations
- public/private API responses

Frontend apps must call the API for sensitive actions.

## Core Entities

- User
- Studio
- StudioMember
- Game
- StreamerProfile
- Campaign
- StreamArchive
- DotsLedgerEntry
- TopUpRequest
- PaymentProof
- AdminAction
- Dispute

Add entities only when they support the MVP loop.

## Campaign Statuses

Use a simple lifecycle first:

- Draft
- Offered
- Accepted
- Rejected
- Funded
- Scheduled
- Submitted
- Approved
- Paid
- Cancelled
- Disputed

Avoid adding negotiation or complex review states until the core loop works.

## Dots Transaction Types

Dots is internal platform credit only.

Expected ledger entry types:

- TopUpCredit
- CampaignEscrowHold
- CampaignEscrowRelease
- CampaignPayout
- CampaignRefund
- PlatformFee
- ManualAdjustment

Every Dots balance change must have a ledger entry and must be executed through `apps/api`.

## Business Model

Initial revenue model:

- platform fee on completed campaigns

Later possible revenue:

- featured game or streamer placement
- managed campaign services

Do not build subscription logic for the MVP.

## Technical Constraints

- Use Privy for auth.
- Do not use Supabase Auth.
- Use Supabase PostgreSQL as the database.
- Use Prisma for schema, migrations, and database access.
- Use Hono for the backend API.
- Use Next.js for public and pro apps.
- Keep `apps/web`, `apps/pro`, and `apps/api` separated.
- Keep sensitive business logic in `apps/api`.
- Treat Dots as internal platform credit only.
- Do not implement crypto token logic.

## Non-MVP Features

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

## Practical Build Order

1. Monorepo foundation.
2. Database schema and migrations.
3. Privy auth integration.
4. User onboarding.
5. Studio and streamer profiles.
6. Game catalog.
7. Streamer catalog.
8. Campaign offer creation.
9. Dots ledger.
10. Escrow funding.
11. Stream submission.
12. Approval and payout.
13. Public discovery pages.
14. Admin tools.
