import { StreamPlatform } from "@maingame/types";

export interface GameDetailPreviewItem {
  kind: "image" | "video";
  src: string;
}

export interface GameDeveloper {
  id: string;
  studioName: string;
  slug: string;
  bio: string | null;
  website: string | null;
}

export interface GameData {
  id: string;
  developerId: string;
  title: string;
  slug: string;
  description: string;
  genre: string | null;
  platforms: string[];
  tags: string[];
  coverImage: string | null;
  horizontalCoverImage: string | null;
  screenshots: string[];
  trailerUrl: string | null;
  gameUrl: string | null;
  websiteUrl: string | null;
  previews: GameDetailPreviewItem[];
  campaignObjective: string | null;
  budgetMinDots: number | null;
  budgetMaxDots: number | null;
  streamerCount: number;
  streamers: { id: string; name: string }[];
  status: string;
  publisher: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  developer: GameDeveloper;
}

export interface StreamerDetailData {
  displayName: string;
  slug: string;
  primaryPlatform: StreamPlatform;
  channelUrl: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string;
  memberSince: string;
  gender?: string;
  language?: string;
  birthDate?: string;
  campaignCount: number;
  subscriberCount?: number;
  totalLikes?: number;
  averageGameRating: number;
  averageStreamerRating: number;
  streamArchives: {
    id: string;
    title: string;
    thumbnailUrl: string;
    gameName: string;
    playedAt: string;
    url: string;
  }[];
  recentCampaigns: {
    gameTitle: string;
    gameSlug: string;
    gameCoverImage: string | null;
    status: string;
    amountDots: number;
  }[];
}

export interface StreamerCardData {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  campaignCount: number;
}

export interface StreamingStreamer {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  viewerCount: number;
}

export interface StreamingGame {
  title: string;
  slug: string;
  coverImage: string | null;
  streamerCount: number;
}
