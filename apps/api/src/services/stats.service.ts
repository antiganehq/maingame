import { prisma } from "@maingame/db";

export async function getPublicStats() {
  const [totalGames, totalStreamers, totalCampaigns, activeCampaigns] =
    await Promise.all([
      prisma.game.count(),
      prisma.streamerProfile.count(),
      prisma.campaign.count(),
      prisma.campaign.count({
        where: {
          status: {
            in: ["ACCEPTED", "FUNDED", "SCHEDULED", "SUBMITTED"],
          },
        },
      }),
    ]);

  return { totalGames, totalStreamers, totalCampaigns, activeCampaigns };
}

export async function getTopGames(limit: number = 10) {
  return prisma.game.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      developer: {
        select: {
          studioName: true,
          slug: true,
        },
      },
      _count: {
        select: {
          campaigns: true,
        },
      },
    },
    orderBy: {
      campaigns: {
        _count: "desc",
      },
    },
    take: limit,
  });
}

export async function getTopStreamers(limit: number = 10) {
  return prisma.streamerProfile.findMany({
    select: {
      id: true,
      displayName: true,
      slug: true,
      primaryPlatform: true,
      user: {
        select: {
          avatar: true,
        },
      },
      _count: {
        select: {
          campaigns: true,
        },
      },
    },
    orderBy: {
      campaigns: {
        _count: "desc",
      },
    },
    take: limit,
  });
}
