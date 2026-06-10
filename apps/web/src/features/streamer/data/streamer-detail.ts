import { StreamPlatform } from "@maingame/types";

export interface StreamerDetailData {
  displayName: string;
  slug: string;
  primaryPlatform: StreamPlatform;
  channelUrl: string;
  avatarUrl: string | null;
  bio: string;
  memberSince: string;
  campaignCount: number;
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

const STREAMERS: Record<string, StreamerDetailData> = {
  pixelpioneer: {
    displayName: "PixelPioneer",
    slug: "pixelpioneer",
    primaryPlatform: StreamPlatform.Twitch,
    channelUrl: "https://twitch.tv/pixelpioneer",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "PixelPioneer is a veteran variety streamer with over 5 years of experience. Known for high-energy gameplay, deep game analysis, and an incredibly welcoming community. Specializes in action RPGs, indie gems, and the occasional retro classic. When not streaming, PixelPioneer runs a weekly game dev podcast and mentors upcoming streamers.",
    memberSince: "2024-03-15",
    campaignCount: 12,
    averageGameRating: 4.6,
    averageStreamerRating: 4.3,
    streamArchives: [
      {
        id: "a1",
        title: "Wayward Warriors — Final Boss & All Secrets Revealed!",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        gameName: "Wayward Warriors",
        playedAt: "2026-06-10",
        url: "https://twitch.tv/videos/123456",
      },
      {
        id: "a2",
        title: "Neon Siege Ranked Grind — Road to Diamond",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        gameName: "Neon Siege",
        playedAt: "2026-06-08",
        url: "https://twitch.tv/videos/123457",
      },
      {
        id: "a3",
        title: "Realm Runners First Playthrough — This Game is WILD",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
        gameName: "Realm Runners",
        playedAt: "2026-06-05",
        url: "https://twitch.tv/videos/123458",
      },
      {
        id: "a4",
        title: "Mecha Rivals Tournament — $500 Prize Pool Finals",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
        gameName: "Mecha Rivals",
        playedAt: "2026-06-02",
        url: "https://twitch.tv/videos/123459",
      },
    ],
    recentCampaigns: [
      {
        gameTitle: "Wayward Warriors",
        gameSlug: "wayward-warriors",
        gameCoverImage:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
        status: "APPROVED",
        amountDots: 5000,
      },
      {
        gameTitle: "Neon Siege",
        gameSlug: "neon-siege",
        gameCoverImage:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
        status: "SUBMITTED",
        amountDots: 3500,
      },
      {
        gameTitle: "Realm Runners",
        gameSlug: "realm-runners",
        gameCoverImage:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
        status: "SCHEDULED",
        amountDots: 4200,
      },
    ],
  },

  streamqueen: {
    displayName: "StreamQueen",
    slug: "streamqueen",
    primaryPlatform: StreamPlatform.YouTube,
    channelUrl: "https://youtube.com/@streamqueen",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    bio: "StreamQueen brings a unique blend of comedy and competitive gaming to YouTube. With a background in theater and a passion for narrative-driven games, every stream feels like a live show. She's built a loyal following of 50K+ subscribers through consistent, high-quality content and genuine community engagement.",
    memberSince: "2024-06-01",
    campaignCount: 8,
    averageGameRating: 4.8,
    averageStreamerRating: 4.9,
    streamArchives: [
      {
        id: "b1",
        title: "Kopi & Kata Full Playthrough — Cozy Vibes Only",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1552820728-8b83bb6b2cf0?q=80&w=800&auto=format&fit=crop",
        gameName: "Kopi & Kata",
        playedAt: "2026-06-09",
        url: "https://youtube.com/watch?v=abc123",
      },
      {
        id: "b2",
        title: "Phantom Protocol Speedrun — New PB!",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
        gameName: "Phantom Protocol",
        playedAt: "2026-06-07",
        url: "https://youtube.com/watch?v=abc124",
      },
      {
        id: "b3",
        title: "Echo Realms Lore Deep Dive — 3 Hours of Secrets",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=800&auto=format&fit=crop",
        gameName: "Echo Realms",
        playedAt: "2026-06-04",
        url: "https://youtube.com/watch?v=abc125",
      },
    ],
    recentCampaigns: [
      {
        gameTitle: "Kopi & Kata",
        gameSlug: "kopi-dan-kata",
        gameCoverImage:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop",
        status: "APPROVED",
        amountDots: 2800,
      },
      {
        gameTitle: "Phantom Protocol",
        gameSlug: "phantom-protocol",
        gameCoverImage:
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
        status: "PAID",
        amountDots: 4000,
      },
    ],
  },

  gamemaster99: {
    displayName: "GameMaster99",
    slug: "gamemaster99",
    primaryPlatform: StreamPlatform.Kick,
    channelUrl: "https://kick.com/gamemaster99",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "GameMaster99 is a competitive gaming legend turned full-time streamer. Former pro player in multiple esports titles, now bringing that same competitive energy to every game he touches. Known for detailed tutorials, honest game reviews, and a no-nonsense approach to content creation. The ultimate destination for gamers who want to improve.",
    memberSince: "2024-01-10",
    campaignCount: 24,
    averageGameRating: 4.2,
    averageStreamerRating: 4.5,
    streamArchives: [
      {
        id: "c1",
        title: "Crystal Vanguard — Pro Tips & Advanced Mechanics Guide",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        gameName: "Crystal Vanguard",
        playedAt: "2026-06-11",
        url: "https://kick.com/gamemaster99/videos/789",
      },
      {
        id: "c2",
        title: "Drift Zone World Record Attempt — LIVE",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
        gameName: "Drift Zone",
        playedAt: "2026-06-09",
        url: "https://kick.com/gamemaster99/videos/790",
      },
      {
        id: "c3",
        title: "Shadow Circuit Competitive — Season 4 Placement Matches",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=800&auto=format&fit=crop",
        gameName: "Shadow Circuit",
        playedAt: "2026-06-07",
        url: "https://kick.com/gamemaster99/videos/791",
      },
      {
        id: "c4",
        title: "Warpath Tactics — Complete Strategy Breakdown",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
        gameName: "Warpath Tactics",
        playedAt: "2026-06-04",
        url: "https://kick.com/gamemaster99/videos/792",
      },
      {
        id: "c5",
        title: "Mecha Rivals 1v1 Tournament — Grand Finals",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
        gameName: "Mecha Rivals",
        playedAt: "2026-06-01",
        url: "https://kick.com/gamemaster99/videos/793",
      },
    ],
    recentCampaigns: [
      {
        gameTitle: "Crystal Vanguard",
        gameSlug: "crystal-vanguard",
        gameCoverImage:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
        status: "APPROVED",
        amountDots: 6000,
      },
      {
        gameTitle: "Drift Zone",
        gameSlug: "drift-zone",
        gameCoverImage:
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop",
        status: "PAID",
        amountDots: 3200,
      },
      {
        gameTitle: "Shadow Circuit",
        gameSlug: "shadow-circuit",
        gameCoverImage:
          "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=600&auto=format&fit=crop",
        status: "SUBMITTED",
        amountDots: 4800,
      },
      {
        gameTitle: "Warpath Tactics",
        gameSlug: "warpath-tactics",
        gameCoverImage:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
        status: "SCHEDULED",
        amountDots: 2500,
      },
    ],
  },
};

export function getStreamer(slug: string): StreamerDetailData | undefined {
  return STREAMERS[slug];
}
