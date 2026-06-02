# PROJECT_CONTEXT.md

# maingame.fun Project Context

## Product

maingame.fun is a marketplace for Game Developers and Streamers.

It helps Game Developers promote their games through streamers, while helping Streamers discover paid game campaigns.

---

## Main Users

## 1. Game Developer

GameDev wants to:

- list games
- find streamers
- create campaign offers
- schedule streams
- pay streamers
- collect feedback
- review stream archives

## 2. Streamer

Streamer wants to:

- discover paid game campaigns
- receive campaign offers
- negotiate or accept offers
- schedule streams
- submit live/archive links
- receive payment in Dots

## 3. Public User

Public user wants to:

- discover games being streamed
- see live/scheduled streams
- view game pages
- view streamer pages
- watch stream archives

## 4. Admin

Admin wants to:

- verify profiles
- approve games
- monitor campaigns
- review payment/top-up requests
- handle disputes
- moderate comments

---

## MVP Goal

The MVP should prove that a GameDev can pay a Streamer to stream a game through maingame.fun.

The MVP is successful if this loop works:

1. GameDev logs in.
2. GameDev creates profile.
3. GameDev creates game.
4. Streamer logs in.
5. Streamer creates profile.
6. GameDev finds streamer.
7. GameDev creates campaign offer.
8. Streamer accepts campaign.
9. GameDev funds campaign with Dots.
10. Streamer streams the game.
11. Streamer submits live/archive link.
12. GameDev approves completion.
13. Streamer receives Dots.

---

## Product Domains

## maingame.fun

Public marketing and discovery app.

Contains:

- landing page
- game catalog
- game detail page
- streamer profile page
- stream schedule
- stream archive

## pro.maingame.fun

Private dashboard app.

Contains:

- login
- onboarding
- GameDev dashboard
- Streamer dashboard
- wallet
- campaigns
- admin dashboard

## api.maingame.fun

Backend API.

Contains:

- business logic
- database access
- campaign operations
- Dots ledger
- escrow
- payment/top-up operations
- admin operations

---

## Core Data Entities

- User
- GameDevProfile
- StreamerProfile
- Game
- Campaign
- DotsTransaction
- TopUpRequest
- Questionnaire
- QuestionnaireQuestion
- QuestionnaireResponse
- Comment

---

## Main Campaign Statuses

- Draft
- Offered
- Negotiating
- Accepted
- Scheduled
- Funded
- Live
- Completed
- Under Review
- Paid
- Cancelled
- Disputed

---

## Main Transaction Types

- TopUpRequest
- TopUpCredit
- CampaignEscrow
- CampaignPayout
- PlatformFee
- Refund
- ManualAdjustment

---

## MVP Business Model

maingame.fun earns revenue from:

- platform fee on completed campaigns
- optional featured placement later
- optional managed campaign services later

Initial platform fee recommendation:
10%

---

## Important Constraints

- Use Privy for auth.
- Use Supabase PostgreSQL for database.
- Use Prisma for schema, migration, and database access.
- Use Hono for backend API.
- Use Next.js for public and pro apps.
- Keep apps separated.
- Keep business logic in API.
- Keep Dots internal.
- Avoid crypto/token implementation for MVP.

---

## Non-MVP Features

Do not build these initially:

- AI matching
- Twitch API integration
- YouTube API integration
- token launch
- blockchain integration
- NFT badges
- advanced questionnaire builder
- advanced analytics
- full chat system
- mobile app

---

## Recommended First Build Order

1. Monorepo foundation
2. Database schema
3. Auth
4. Onboarding
5. Profiles
6. Game catalog
7. Streamer catalog
8. Campaign offer
9. Scheduling
10. Dots ledger
11. Escrow and payout
12. Public discovery
13. Admin tools
14. QA
