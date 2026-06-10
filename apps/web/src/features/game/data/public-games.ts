export interface StreamingGame {
  title: string;
  slug: string;
  coverImage: string | null;
  streamerCount: number;
}

export const streamingGames: StreamingGame[] = [
  {
    title: "Wayward Warriors",
    slug: "wayward-warriors",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    streamerCount: 12,
  },
  {
    title: "Neon Siege",
    slug: "neon-siege",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    streamerCount: 18,
  },
  {
    title: "Realm Runners",
    slug: "realm-runners",
    coverImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
    streamerCount: 7,
  },
  {
    title: "Phantom Protocol",
    slug: "phantom-protocol",
    coverImage:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    streamerCount: 14,
  },
  {
    title: "Mecha Rivals",
    slug: "mecha-rivals",
    coverImage:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=600&auto=format&fit=crop",
    streamerCount: 9,
  },
  {
    title: "Echo Realms",
    slug: "echo-realms",
    coverImage:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=600&auto=format&fit=crop",
    streamerCount: 11,
  },
  {
    title: "Crystal Vanguard",
    slug: "crystal-vanguard",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    streamerCount: 8,
  },
  {
    title: "Drift Zone",
    slug: "drift-zone",
    coverImage:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop",
    streamerCount: 6,
  },
];

export function getStreamingToday(): StreamingGame[] {
  return streamingGames;
}
