# MVP_SCOPE.md

Read this before every feature task. It defines what belongs in the first maingame.fun MVP and what must wait.

## MVP Objective

The MVP proves one core outcome:

A GameDev can pay a Streamer in internal Dots credit to stream a game, submit proof, receive approval, and get paid.

## Core MVP Loop

1. GameDev signs in with Privy.
2. GameDev creates a studio profile.
3. GameDev creates a game listing.
4. Streamer signs in with Privy.
5. Streamer creates a creator profile.
6. GameDev browses streamers.
7. GameDev creates a campaign offer.
8. GameDev funds campaign escrow using Dots.
9. Streamer accepts or rejects the campaign.
10. Streamer streams the game.
11. Streamer submits live/archive link.
12. GameDev approves completion.
13. API releases Dots to Streamer.

If a feature does not support this loop, it is not MVP unless explicitly listed below.

## MVP Features

## Auth

Included:

- Privy login for `apps/pro`.
- Local user record linked to Privy user ID.
- Basic role selection or role assignment for GameDev and Streamer.
- Authenticated API requests from `apps/pro` to `apps/api`.
- API-side auth verification before private reads/writes.

Not included:

- Supabase Auth.
- Custom password auth.
- Organization SSO.
- Complex role/permission builder.

## Profiles

Included:

- GameDev studio profile creation and editing.
- Streamer creator profile creation and editing.
- Basic public profile fields needed for discovery.
- Profile ownership checks in `apps/api`.

Not included:

- Verification badges beyond simple admin flags.
- Team invites beyond minimal studio membership if required.
- Rich creator media kits.
- Social graph/following.

## Catalog

Included:

- Game listing creation by GameDev.
- Game listing editing by owner.
- Basic public game catalog.
- Basic game detail page.
- Basic streamer catalog for GameDev discovery.
- Basic streamer detail page.

Not included:

- Advanced search ranking.
- Recommendation engine.
- Personalized discovery.
- Complex genre/category taxonomy.

## Campaign

Included:

- GameDev creates campaign offer for a selected streamer.
- Campaign has game, streamer, brief, Dots budget, schedule target, and status.
- Streamer can accept or reject offer.
- GameDev can fund accepted/offered campaign with Dots escrow.
- Streamer can submit live/archive link.
- GameDev can approve completion.
- API controls all campaign status transitions.

Minimum statuses:

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

Not included:

- Negotiation/chat workflow.
- Automated stream verification.
- Twitch/YouTube API sync.
- Multi-stream campaign packages.
- Complex dispute workflow beyond basic admin visibility.

## Dots

Included:

- Dots as internal platform credit only.
- Database ledger for every Dots balance change.
- Manual or semi-manual top-up request.
- Admin top-up approval.
- Campaign escrow hold.
- Escrow release to Streamer after GameDev approval.
- Refund path for cancelled campaigns.
- Optional platform fee ledger entry if implemented simply.

All Dots operations must happen through `apps/api`.

Not included:

- Crypto token logic.
- Blockchain wallet transfers.
- On-chain ledger.
- Token minting.
- Staking.
- Trading.
- Multi-currency wallet.

## Public Discovery

Included in `apps/web`:

- Public homepage.
- Public game catalog.
- Public game detail pages.
- Public streamer pages.
- "Streaming today" page.
- Public stream archive pages.

Not included:

- Public comments.
- User accounts in public app.
- Personalized feeds.
- Advanced SEO automation beyond basic metadata.

## Questionnaire-Lite

Included:

- Basic campaign brief fields.
- Optional simple questions from GameDev to Streamer if needed for campaign fit.
- Optional streamer response text fields.

Rules:

- Keep this lightweight.
- Store simple prompt/answer data only if needed.

Not included:

- Full questionnaire builder.
- Conditional logic.
- Scoring system.
- AI-generated questionnaires.
- Survey analytics.

## Admin

Included:

- Admin can see users, games, profiles, campaigns, and top-up requests.
- Admin can approve/reject top-ups.
- Admin can make manual Dots ledger adjustments with reason.
- Admin can mark basic moderation flags if needed.
- Admin actions must go through `apps/api`.

Not included:

- Full CMS.
- Advanced moderation tooling.
- Complex dispute center.
- Support ticket system.
- Fraud automation.

## QA

Included:

- Basic happy-path test coverage for API campaign/Dots operations once implemented.
- Validation tests for shared Zod schemas when behavior matters.
- Manual smoke test checklist for web, pro, and API.
- Basic error-state handling for MVP forms.

Not included:

- Full end-to-end automation across every flow.
- Load testing.
- Advanced observability.
- Visual regression testing.

## App Boundaries

MVP must preserve these boundaries:

- `apps/web` is public discovery only.
- `apps/pro` is the authenticated dashboard UI.
- `apps/api` owns sensitive business logic.
- `packages/db` owns Prisma schema/client setup.
- `packages/validators` owns shared Zod schemas.
- `packages/types` owns shared domain types.
- `packages/ui` owns reusable UI primitives.

Frontend apps must not directly mutate Dots balances, campaign status, escrow, payouts, or top-ups.

## Deferred Features

Do not build these in MVP unless explicitly requested:

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
- automated stream verification
- full chat system
- complex questionnaire builder
- advanced analytics
- public comments
- affiliate/referral system
- mobile app
- desktop app
- multi-service architecture

## MVP Done Criteria

MVP is done when:

- GameDev can create a profile and game.
- Streamer can create a profile.
- GameDev can choose a streamer and create a campaign offer.
- Campaign can be funded with internal Dots escrow.
- Streamer can accept and submit archive proof.
- GameDev can approve completion.
- API releases Dots to Streamer ledger.
- Public users can browse basic games, streamers, today, and archives.
- Admin can approve manual top-ups and inspect campaign/Dots records.

Anything beyond this should be treated as post-MVP.
