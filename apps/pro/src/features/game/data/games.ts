import type { GameDetailPreviewItem } from "@maingame/components";

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

const GAMES: Record<string, GameData> = {
  "wayward-warriors": {
    id: "game-001",
    developerId: "dev-001",
    title: "Wayward Warriors",
    slug: "wayward-warriors",
    description:
      "A fast-paced action RPG set in a mythical archipelago. Battle creatures from Indonesian legends and uncover ancient secrets hidden across floating islands.\n\nExplore vast temples, master elemental combat, and forge alliances with mythical spirits. Every island holds a new challenge.",
    genre: "Action RPG",
    platforms: ["PC", "Mac", "Steam Deck"],
    tags: ["Action", "RPG", "Mythology", "Single-player", "Adventure", "Indie"],
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    horizontalCoverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
    ],
    previews: [],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/waywardwarriors",
    websiteUrl: "https://waywardwarriors.game",
    campaignObjective:
      "Drive wishlist adds and demo downloads ahead of Steam Next Fest.",
    budgetMinDots: 3000,
    budgetMaxDots: 8000,
    streamerCount: 24,
    streamers: [
      { id: "s1", name: "PixelPioneer" },
      { id: "s2", name: "StreamQueen" },
      { id: "s3", name: "GameMaster99" },
      { id: "s4", name: "LootGoblin" },
      { id: "s5", name: "NightOwlPlays" },
      { id: "s6", name: "BossFightBen" },
      { id: "s7", name: "CozyCatStreams" },
      { id: "s8", name: "SpeedDemon" },
    ],
    status: "PUBLISHED",
    publisher: "Nusantara Games",
    releaseDate: "2026-03-15",
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    developer: {
      id: "dev-001",
      studioName: "Nusantara Games",
      slug: "nusantara-games",
      bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore. Small team, big stories.",
      website: "https://nusantaragames.id",
    },
  },

  "kopi-dan-kata": {
    id: "game-002",
    developerId: "dev-001",
    title: "Kopi & Kata",
    slug: "kopi-dan-kata",
    description:
      "A cozy narrative game about running a small coffee shop in Yogyakarta. Listen to customers' stories, brew drinks, and shape the neighborhood.\n\nEach cup tells a story. Meet travelers, artists, and locals — and discover how a simple coffee shop can change lives.",
    genre: "Simulation / Narrative",
    platforms: ["PC", "Mac"],
    tags: ["Simulation", "Narrative", "Cozy", "Casual", "Story Rich", "Indie"],
    coverImage:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
    horizontalCoverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    ],
    previews: [],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/kopidankata",
    websiteUrl: "https://kopidankata.game",
    campaignObjective: "Reach cozy game audiences in SEA and Japan.",
    budgetMinDots: 2000,
    budgetMaxDots: 5000,
    streamerCount: 8,
    streamers: [
      { id: "s10", name: "CozyVibes" },
      { id: "s11", name: "StoryTeller" },
      { id: "s12", name: "MorningBrew" },
      { id: "s13", name: "IndieHunter" },
    ],
    status: "DRAFT",
    publisher: "Nusantara Games",
    releaseDate: "2026-05-01",
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    developer: {
      id: "dev-001",
      studioName: "Nusantara Games",
      slug: "nusantara-games",
      bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore. Small team, big stories.",
      website: "https://nusantaragames.id",
    },
  },

  "neon-siege": {
    id: "game-003",
    developerId: "dev-002",
    title: "Neon Siege",
    slug: "neon-siege",
    description:
      "A cyberpunk tactical shooter where every run is different. Assemble your crew, breach corporate fortresses, and extract before the grid goes dark.\n\nProcedurally generated missions, deep squad customization, and a synthwave soundtrack that keeps your pulse racing.",
    genre: "Tactical Shooter",
    platforms: ["PC", "PlayStation 5", "Xbox Series X"],
    tags: ["Shooter", "Tactical", "Cyberpunk", "Multiplayer", "Sci-Fi", "Action"],
    coverImage:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2b26?w=1200&q=80",
    horizontalCoverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1200&q=80",
    ],
    previews: [],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/neonsiege",
    websiteUrl: "https://neonsiege.io",
    campaignObjective:
      "Build launch week momentum with 20+ streamers across PC and console.",
    budgetMinDots: 10000,
    budgetMaxDots: 25000,
    streamerCount: 36,
    streamers: [
      { id: "s14", name: "CyberAce" },
      { id: "s15", name: "TacticalTom" },
      { id: "s16", name: "NeonGhost" },
      { id: "s17", name: "SiegeQueen" },
      { id: "s18", name: "DroneOperator" },
      { id: "s19", name: "SynthRunner" },
    ],
    status: "ARCHIVED",
    publisher: "Volt Hex Studios",
    releaseDate: "2026-07-20",
    createdAt: "2026-06-05T00:00:00Z",
    updatedAt: "2026-06-05T00:00:00Z",
    developer: {
      id: "dev-002",
      studioName: "Volt Hex Studios",
      slug: "volt-hex",
      bio: "Berlin-based indie team crafting tactical experiences with a neon aesthetic. Small team, big guns.",
      website: "https://volthex.io",
    },
  },
};

function makePreviews(screenshots: string[]): GameDetailPreviewItem[] {
  return screenshots.map((src) => ({ kind: "image" as const, src }));
}

for (const game of Object.values(GAMES)) {
  if (game.previews.length === 0) {
    (game as { previews: GameDetailPreviewItem[] }).previews = makePreviews(
      game.screenshots,
    );
  }
}

export function getAllGames(): GameData[] {
  return Object.values(GAMES);
}

export function getGame(slug: string): GameData | undefined {
  return GAMES[slug];
}
