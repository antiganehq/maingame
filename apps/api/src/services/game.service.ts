import { prisma } from "@maingame/db";
import type { Game } from "@maingame/db";

interface ListGamesParams {
  status?: string;
  genre?: string;
  page: number;
  limit: number;
}

interface ListGamesResult {
  games: (Game & { developer: { studioName: string; slug: string } })[];
  total: number;
}

export async function listGames(params: ListGamesParams): Promise<ListGamesResult> {
  const { status, genre, page, limit } = params;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (genre) {
    where.genre = { contains: genre, mode: "insensitive" };
  }

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      where,
      include: {
        developer: {
          select: {
            studioName: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.game.count({ where })
  ]);

  return { games, total };
}

export async function getGameBySlug(slug: string) {
  return prisma.game.findUnique({
    where: { slug },
    include: {
      developer: {
        select: {
          id: true,
          studioName: true,
          slug: true,
          bio: true,
          website: true
        }
      }
    }
  });
}

export async function getGameById(id: string) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      developer: {
        select: {
          id: true,
          studioName: true,
          slug: true,
          bio: true,
          website: true
        }
      }
    }
  });
}

export async function createGame(data: {
  title: string;
  slug: string;
  description: string;
  genre?: string;
  platforms: string[];
  coverImage?: string;
  screenshots?: string[];
  trailerUrl?: string;
  gameUrl?: string;
  campaignObjective?: string;
  budgetMinDots?: number;
  budgetMaxDots?: number;
  developerId: string;
}) {
  return prisma.game.create({
    data: {
      ...data,
      screenshots: data.screenshots ?? [],
      status: "DRAFT"
    },
    include: {
      developer: {
        select: {
          studioName: true,
          slug: true
        }
      }
    }
  });
}

export async function updateGame(id: string, data: Partial<{
  title: string;
  slug: string;
  description: string;
  genre?: string;
  platforms: string[];
  coverImage?: string;
  screenshots?: string[];
  trailerUrl?: string;
  gameUrl?: string;
  campaignObjective?: string;
  budgetMinDots?: number;
  budgetMaxDots?: number;
}>) {
  return prisma.game.update({
    where: { id },
    data,
    include: {
      developer: {
        select: {
          studioName: true,
          slug: true
        }
      }
    }
  });
}

export async function updateGameStatus(id: string, status: Game["status"]) {
  return prisma.game.update({
    where: { id },
    data: { status },
    include: {
      developer: {
        select: {
          studioName: true,
          slug: true
        }
      }
    }
  });
}

export async function deleteGame(id: string) {
  return prisma.game.delete({ where: { id } });
}

export async function getGameDevProfile(userId: string) {
  return prisma.gameDevProfile.findFirst({
    where: { userId }
  });
}
