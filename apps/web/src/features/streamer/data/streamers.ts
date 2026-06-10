import { StreamPlatform } from "@maingame/types";

export interface StreamingStreamer {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  viewerCount: number;
}

export const streamingStreamers: StreamingStreamer[] = [
  {
    displayName: "BayuPlays",
    slug: "bayuplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    viewerCount: 1247,
  },
  {
    displayName: "MeiCasts",
    slug: "meicasts",
    avatarUrl:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2cf0?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
    viewerCount: 843,
  },
  {
    displayName: "DimasArena",
    slug: "dimasarena",
    avatarUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    viewerCount: 3200,
  },
  {
    displayName: "SariGaming",
    slug: "sarigaming",
    avatarUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
    viewerCount: 562,
  },
  {
    displayName: "RizkyLive",
    slug: "rizkylive",
    avatarUrl:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    viewerCount: 2198,
  },
  {
    displayName: "LunaStreams",
    slug: "lunastreams",
    avatarUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
    viewerCount: 4100,
  },
  {
    displayName: "AgungGG",
    slug: "agunggg",
    avatarUrl:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
    viewerCount: 731,
  },
  {
    displayName: "CitraPlays",
    slug: "citraplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
    viewerCount: 389,
  },
];

export function getStreamingStreamers(): StreamingStreamer[] {
  return streamingStreamers;
}
