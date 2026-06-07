import { prisma } from "@maingame/db";

interface ListStreamersParams {
  platform?: string;
  page: number;
  limit: number;
}

export async function listStreamers(params: ListStreamersParams) {
  const { platform, page, limit } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (platform) {
    where.primaryPlatform = platform;
  }

  const [streamers, total] = await Promise.all([
    prisma.streamerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            campaigns: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.streamerProfile.count({ where })
  ]);

  return { streamers, total };
}

export async function getStreamerBySlug(slug: string) {
  return prisma.streamerProfile.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
          createdAt: true
        }
      },
      _count: {
        select: {
          campaigns: true
        }
      },
      campaigns: {
        where: {
          status: { in: ["SCHEDULED", "SUBMITTED", "APPROVED"] }
        },
        include: {
          game: {
            select: {
              title: true,
              slug: true,
              coverImage: true
            }
          }
        },
        orderBy: { createdAt: "desc" },
        take: 10
      }
    }
  });
}
