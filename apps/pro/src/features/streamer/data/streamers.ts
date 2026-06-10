import { StreamPlatform } from "@maingame/types";

export interface AvailableStreamer {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  campaignCount: number;
}

export const availableStreamers: AvailableStreamer[] = [
  {
    displayName: "PixelPioneer",
    slug: "pixelpioneer",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    campaignCount: 12,
  },
  {
    displayName: "StreamQueen",
    slug: "streamqueen",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
    campaignCount: 8,
  },
  {
    displayName: "GameMaster99",
    slug: "gamemaster99",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    campaignCount: 24,
  },
  {
    displayName: "LootGoblin",
    slug: "lootgoblin",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
    campaignCount: 3,
  },
  {
    displayName: "NightOwlPlays",
    slug: "nightowlplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    campaignCount: 15,
  },
  {
    displayName: "BossFightBen",
    slug: "bossfightben",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
    campaignCount: 6,
  },
  {
    displayName: "CozyCatStreams",
    slug: "cozycatstreams",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    campaignCount: 19,
  },
  {
    displayName: "SpeedDemon",
    slug: "speeddemon",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
    campaignCount: 11,
  },
  {
    displayName: "CyberAce",
    slug: "cyberace",
    avatarUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
    campaignCount: 7,
  },
  {
    displayName: "TacticalTom",
    slug: "tacticaltom",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    campaignCount: 14,
  },
  {
    displayName: "SiegeQueen",
    slug: "siegequeen",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
    campaignCount: 9,
  },
  {
    displayName: "SynthRunner",
    slug: "synthrunner",
    avatarUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
    campaignCount: 5,
  },
];
