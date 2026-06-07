import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  await prisma.$transaction(
    async (tx) => {
      // 1. GameDev User
      const gameDevUser = await tx.user.create({
        data: {
          privyUserId: "dev-sea-gamedev-001",
          email: "raka@nusantaragames.id",
          name: "Raka Pratama",
          role: "GAME_DEVELOPER"
        }
      });

      // GameDev Profile
      const gameDevProfile = await tx.gameDevProfile.create({
        data: {
          userId: gameDevUser.id,
          studioName: "Nusantara Games",
          slug: "nusantara-games",
          bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore.",
          website: "https://nusantaragames.id",
          status: "ACTIVE"
        }
      });

      // GameDev Wallet
      await tx.walletBalance.create({
        data: {
          userId: gameDevUser.id,
          balance: 15000
        }
      });

      console.log(`✅ GameDev created: ${gameDevUser.name}`);

      // Top-up transaction for GameDev
      await tx.dotsTransaction.create({
        data: {
          userId: gameDevUser.id,
          type: "TOP_UP_CREDIT",
          amount: 15000,
          status: "COMPLETED",
          referenceType: "TOP_UP",
          metadata: { note: "Initial seed funding" }
        }
      });

      // 2. Games
      const game1 = await tx.game.create({
        data: {
          developerId: gameDevProfile.id,
          title: "Wayward Warriors",
          slug: "wayward-warriors",
          description:
            "A fast-paced action RPG set in a mythical archipelago. Battle creatures from Indonesian legends and uncover ancient secrets.",
          genre: "Action RPG",
          platforms: ["PC", "Steam"],
          coverImage: "https://placehold.co/600x400/1a1a2e/e94560?text=Wayward+Warriors",
          screenshots: [
            "https://placehold.co/800x450/16213e/0f3460?text=Gameplay+1",
            "https://placehold.co/800x450/1a1a2e/e94560?text=Gameplay+2"
          ],
          trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          gameUrl: "https://store.steampowered.com/app/waywardwarriors",
          campaignObjective: "Drive wishlist adds and demo downloads ahead of Steam Next Fest.",
          budgetMinDots: 3000,
          budgetMaxDots: 8000,
          status: "PUBLISHED"
        }
      });

      const game2 = await tx.game.create({
        data: {
          developerId: gameDevProfile.id,
          title: "Kopi & Kata",
          slug: "kopi-dan-kata",
          description:
            "A cozy narrative game about running a small coffee shop in Yogyakarta. Listen to customers' stories, brew drinks, and shape the neighborhood.",
          genre: "Simulation / Narrative",
          platforms: ["PC", "Mac", "Steam"],
          coverImage: "https://placehold.co/600x400/f5ebe0/6b4226?text=Kopi+%26+Kata",
          screenshots: [
            "https://placehold.co/800x450/d4a373/faedcd?text=Cafe+Interior",
            "https://placehold.co/800x450/ccd5ae/e9edc9?text=Customer+Story"
          ],
          trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          gameUrl: "https://store.steampowered.com/app/kopidankata",
          campaignObjective: "Reach cozy game audiences in SEA and Japan.",
          budgetMinDots: 2000,
          budgetMaxDots: 5000,
          status: "PUBLISHED"
        }
      });

      console.log(`✅ Games created: ${game1.title}, ${game2.title}`);

      // 3. Streamers
      const streamerData = [
        {
          privyUserId: "dev-sea-streamer-001",
          email: "bayu.gaming@gmail.com",
          name: "Bayu Setiawan",
          displayName: "BayuPlays",
          slug: "bayuplays",
          platform: "YOUTUBE" as const,
          channelUrl: "https://youtube.com/@BayuPlays"
        },
        {
          privyUserId: "dev-sea-streamer-002",
          email: "mei.ling.streams@yahoo.com",
          name: "Mei Ling",
          displayName: "MeiCasts",
          slug: "meicasts",
          platform: "TWITCH" as const,
          channelUrl: "https://twitch.tv/meicasts"
        },
        {
          privyUserId: "dev-sea-streamer-003",
          email: "dimas.arena@outlook.com",
          name: "Dimas Arya",
          displayName: "DimasArena",
          slug: "dimasarena",
          platform: "KICK" as const,
          channelUrl: "https://kick.com/dimasarena"
        }
      ];

      const streamerProfiles = [];

      for (const s of streamerData) {
        const user = await tx.user.create({
          data: {
            privyUserId: s.privyUserId,
            email: s.email,
            name: s.name,
            role: "STREAMER"
          }
        });

        const profile = await tx.streamerProfile.create({
          data: {
            userId: user.id,
            displayName: s.displayName,
            slug: s.slug,
            primaryPlatform: s.platform,
            channelUrl: s.channelUrl
          }
        });

        await tx.walletBalance.create({
          data: {
            userId: user.id,
            balance: 0
          }
        });

        streamerProfiles.push({ user, profile });
        console.log(`✅ Streamer created: ${s.displayName}`);
      }

      // 4. Scheduled Campaign
      const scheduledCampaign = await tx.campaign.create({
        data: {
          gameId: game1.id,
          streamerProfileId: streamerProfiles[0].profile.id,
          title: "Wayward Warriors - First Look Stream",
          objective: "Showcase combat mechanics and boss fight to 5k+ concurrent viewers.",
          requirements: "Play at least 2 hours. Highlight the new update features.",
          proposedStartAt: new Date("2026-06-15T19:00:00Z"),
          scheduledAt: new Date("2026-06-15T19:00:00Z"),
          durationMinutes: 120,
          amountDots: 4000,
          platformFeeDots: 400,
          status: "SCHEDULED",
          offeredAt: new Date("2026-06-01T10:00:00Z"),
          acceptedAt: new Date("2026-06-02T14:00:00Z"),
          fundedAt: new Date("2026-06-03T09:00:00Z"),
          scheduledSetAt: new Date("2026-06-03T09:30:00Z")
        }
      });

      await tx.campaignEvent.createMany({
        data: [
          { campaignId: scheduledCampaign.id, eventType: "CREATED", description: "Campaign created by Nusantara Games" },
          { campaignId: scheduledCampaign.id, eventType: "OFFERED", description: "Offer sent to BayuPlays" },
          { campaignId: scheduledCampaign.id, eventType: "ACCEPTED", description: "BayuPlays accepted the campaign" },
          { campaignId: scheduledCampaign.id, eventType: "FUNDED", description: "Escrow funded with 4000 Dots" },
          { campaignId: scheduledCampaign.id, eventType: "SCHEDULED", description: "Stream scheduled for June 15" }
        ]
      });

      // Update GameDev wallet for escrow hold
      await tx.walletBalance.update({
        where: { userId: gameDevUser.id },
        data: { balance: { decrement: 4400 } }
      });

      await tx.dotsTransaction.create({
        data: {
          userId: gameDevUser.id,
          type: "CAMPAIGN_ESCROW_HOLD",
          amount: -4400,
          status: "COMPLETED",
          referenceType: "CAMPAIGN",
          campaignId: scheduledCampaign.id,
          metadata: { note: "Escrow hold for scheduled campaign" }
        }
      });

      console.log(`✅ Scheduled campaign created: ${scheduledCampaign.title}`);

      // 5. Completed Campaign
      const completedCampaign = await tx.campaign.create({
        data: {
          gameId: game2.id,
          streamerProfileId: streamerProfiles[1].profile.id,
          title: "Kopi & Kata - Cozy Sunday Stream",
          objective: "Introduce the game to cozy gaming community. Focus on narrative and art style.",
          requirements: "3 hour stream. Share personal thoughts on the story.",
          proposedStartAt: new Date("2026-05-20T18:00:00Z"),
          scheduledAt: new Date("2026-05-20T18:00:00Z"),
          durationMinutes: 180,
          amountDots: 3000,
          platformFeeDots: 300,
          status: "PAID",
          liveUrl: "https://youtube.com/watch?v=completed-stream-id",
          archiveUrl: "https://youtube.com/watch?v=completed-stream-id",
          completionProof: "Stream reached 2.5k peak viewers. Chat was very engaged.",
          reviewNotes: "Excellent coverage. Story resonated well with audience.",
          offeredAt: new Date("2026-05-10T10:00:00Z"),
          acceptedAt: new Date("2026-05-11T12:00:00Z"),
          fundedAt: new Date("2026-05-12T09:00:00Z"),
          scheduledSetAt: new Date("2026-05-12T09:30:00Z"),
          submittedAt: new Date("2026-05-20T21:15:00Z"),
          approvedAt: new Date("2026-05-21T10:00:00Z"),
          paidAt: new Date("2026-05-21T10:05:00Z")
        }
      });

      await tx.streamArchive.create({
        data: {
          campaignId: completedCampaign.id,
          liveUrl: "https://youtube.com/watch?v=completed-stream-id",
          archiveUrl: "https://youtube.com/watch?v=completed-stream-id",
          notes: "Full VOD available."
        }
      });

      await tx.campaignEvent.createMany({
        data: [
          { campaignId: completedCampaign.id, eventType: "CREATED", description: "Campaign created" },
          { campaignId: completedCampaign.id, eventType: "OFFERED", description: "Offer sent to MeiCasts" },
          { campaignId: completedCampaign.id, eventType: "ACCEPTED", description: "MeiCasts accepted" },
          { campaignId: completedCampaign.id, eventType: "FUNDED", description: "Escrow funded with 3000 Dots" },
          { campaignId: completedCampaign.id, eventType: "SCHEDULED", description: "Stream scheduled for May 20" },
          { campaignId: completedCampaign.id, eventType: "SUBMITTED", description: "Streamer submitted completion proof" },
          { campaignId: completedCampaign.id, eventType: "APPROVED", description: "GameDev approved completion" },
          { campaignId: completedCampaign.id, eventType: "PAID", description: "Dots released to streamer" }
        ]
      });

      // Dots transactions for completed campaign
      await tx.dotsTransaction.create({
        data: {
          userId: gameDevUser.id,
          type: "CAMPAIGN_ESCROW_HOLD",
          amount: -3300,
          status: "COMPLETED",
          referenceType: "CAMPAIGN",
          campaignId: completedCampaign.id,
          createdAt: new Date("2026-05-12T09:00:00Z")
        }
      });

      await tx.dotsTransaction.create({
        data: {
          userId: gameDevUser.id,
          type: "CAMPAIGN_ESCROW_RELEASE",
          amount: 3300,
          status: "COMPLETED",
          referenceType: "CAMPAIGN",
          campaignId: completedCampaign.id,
          createdAt: new Date("2026-05-21T10:00:00Z")
        }
      });

      await tx.dotsTransaction.create({
        data: {
          userId: gameDevUser.id,
          type: "PLATFORM_FEE",
          amount: -300,
          status: "COMPLETED",
          referenceType: "PLATFORM",
          campaignId: completedCampaign.id,
          createdAt: new Date("2026-05-21T10:00:00Z")
        }
      });

      await tx.dotsTransaction.create({
        data: {
          userId: streamerProfiles[1].user.id,
          type: "CAMPAIGN_PAYOUT",
          amount: 3000,
          status: "COMPLETED",
          referenceType: "CAMPAIGN",
          campaignId: completedCampaign.id,
          createdAt: new Date("2026-05-21T10:05:00Z")
        }
      });

      // Update wallets
      await tx.walletBalance.update({
        where: { userId: streamerProfiles[1].user.id },
        data: { balance: { increment: 3000 } }
      });

      console.log(`✅ Completed campaign created: ${completedCampaign.title}`);

      // 6. Questionnaire for completed campaign
      const questionnaire = await tx.questionnaire.create({
        data: {
          campaignId: completedCampaign.id,
          title: "Post-Campaign Feedback"
        }
      });

      const q1 = await tx.questionnaireQuestion.create({
        data: {
          questionnaireId: questionnaire.id,
          questionType: "RATING",
          label: "How would you rate your overall experience with this campaign?",
          required: true,
          options: [],
          order: 1
        }
      });

      const q2 = await tx.questionnaireQuestion.create({
        data: {
          questionnaireId: questionnaire.id,
          questionType: "LONG_TEXT",
          label: "What did you enjoy most about streaming this game?",
          required: true,
          options: [],
          order: 2
        }
      });

      const q3 = await tx.questionnaireQuestion.create({
        data: {
          questionnaireId: questionnaire.id,
          questionType: "YES_NO",
          label: "Would you be interested in streaming this game again?",
          required: false,
          options: [],
          order: 3
        }
      });

      const q4 = await tx.questionnaireQuestion.create({
        data: {
          questionnaireId: questionnaire.id,
          questionType: "MULTIPLE_CHOICE",
          label: "Which game feature did your audience react to the most?",
          required: true,
          options: ["Art Style", "Story/Narrative", "Gameplay Mechanics", "Music/Sound"],
          order: 4
        }
      });

      // Questionnaire response
      const response = await tx.questionnaireResponse.create({
        data: {
          questionnaireId: questionnaire.id,
          campaignId: completedCampaign.id,
          submittedAt: new Date("2026-05-21T11:00:00Z")
        }
      });

      await tx.questionnaireAnswer.createMany({
        data: [
          { responseId: response.id, questionId: q1.id, numberValue: 5 },
          { responseId: response.id, questionId: q2.id, textValue: "The narrative really resonated with my audience. The cozy cafe setting felt very relatable for my viewers in Malaysia." },
          { responseId: response.id, questionId: q3.id, booleanValue: true },
          { responseId: response.id, questionId: q4.id, arrayValue: ["Story/Narrative", "Art Style"] }
        ]
      });

      console.log(`✅ Questionnaire and response created for: ${completedCampaign.title}`);
    },
    { timeout: 20000 }
  );

  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
