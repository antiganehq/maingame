import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GameDetail,
  GameDetailHero,
  GameDetailGlance,
  GameDetailContent,
  GameDetailSidebar,
  type GameDetailData,
  type GameDetailPreviewItem,
} from "@maingame/components";

interface GameDeveloper {
  id: string;
  studioName: string;
  slug: string;
  bio: string | null;
  website: string | null;
}

interface GameData {
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
  status: string;
  publisher: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  developer: GameDeveloper;
}

function makePreviews(screenshots: string[]): GameDetailPreviewItem[] {
  return screenshots.map((src) => ({ kind: "image" as const, src }));
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
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    horizontalCoverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
    ],
    previews: [] as GameDetailPreviewItem[],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/waywardwarriors",
    websiteUrl: "https://waywardwarriors.game",
    campaignObjective: "Drive wishlist adds and demo downloads ahead of Steam Next Fest.",
    budgetMinDots: 3000,
    budgetMaxDots: 8000,
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
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
    horizontalCoverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    ],
    previews: [] as GameDetailPreviewItem[],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/kopidankata",
    websiteUrl: "https://kopidankata.game",
    campaignObjective: "Reach cozy game audiences in SEA and Japan.",
    budgetMinDots: 2000,
    budgetMaxDots: 5000,
    status: "PUBLISHED",
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
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b26?w=1200&q=80",
    horizontalCoverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1200&q=80",
    ],
    previews: [] as GameDetailPreviewItem[],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/neonsiege",
    websiteUrl: "https://neonsiege.io",
    campaignObjective: "Build launch week momentum with 20+ streamers across PC and console.",
    budgetMinDots: 10000,
    budgetMaxDots: 25000,
    status: "PUBLISHED",
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

// Initialize previews from screenshots after GAMES is defined
for (const game of Object.values(GAMES)) {
  if (game.previews.length === 0) {
    (game as { previews: GameDetailPreviewItem[] }).previews = makePreviews(game.screenshots);
  }
}

function getGame(slug: string): GameData {
  const game = GAMES[slug];
  if (!game) notFound();
  return game;
}

function mapToGameDetailData(game: GameData): GameDetailData {
  return {
    title: game.title,
    slug: game.slug,
    description: game.description,
    genre: game.genre,
    platforms: game.platforms,
    tags: game.tags,
    screenshots: game.screenshots,
    trailerUrl: game.trailerUrl,
    coverImage: game.coverImage,
    horizontalCoverImage: game.horizontalCoverImage,
    gameUrl: game.gameUrl,
    websiteUrl: game.websiteUrl,
    developer: {
      studioName: game.developer.studioName,
      slug: game.developer.slug,
      bio: game.developer.bio,
      website: game.developer.website,
    },
    publisher: game.publisher,
    releaseDate: game.releaseDate,
    systemRequirements: [],
    previews: game.previews,
    status: game.status,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = GAMES[slug];

  if (!game) {
    return { title: "Game not found — maingame.fun" };
  }

  return {
    title: `${game.title} — maingame.fun`,
    description: game.description.slice(0, 160),
    openGraph: game.coverImage
      ? {
          title: game.title,
          description: game.description.slice(0, 160),
          images: [game.coverImage],
        }
      : undefined,
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  const d = mapToGameDetailData(game);

  return (
    <GameDetail>
      <GameDetailHero
        coverImage={d.coverImage}
        title={d.title}
        developer={d.developer}
        tags={d.tags}
        status={d.status}
      />

      <GameDetailGlance
        previews={d.previews}
        horizontalCoverImage={d.horizontalCoverImage}
        title={d.title}
        description={d.description}
        tags={d.tags}
      />

      <GameDetailContent>
        <div className="lg:flex-1 lg:min-w-0 space-y-8">
          {game.campaignObjective && (
            <section>
              <h2 className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-3">
                Campaign Details
              </h2>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] p-5 space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-1">
                    Objective
                  </p>
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                    {game.campaignObjective}
                  </p>
                </div>
                {(game.budgetMinDots != null || game.budgetMaxDots != null) && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-1">
                      Campaign Budget
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-foreground)]">
                      {game.budgetMinDots != null
                        ? `${game.budgetMinDots.toLocaleString()} Dots`
                        : "\u2014"}
                      {" \u2014 "}
                      {game.budgetMaxDots != null
                        ? `${game.budgetMaxDots.toLocaleString()} Dots`
                        : "\u2014"}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <GameDetailSidebar
          genre={d.genre}
          platforms={d.platforms}
          developer={d.developer}
          publisher={d.publisher}
          releaseDate={d.releaseDate}
          websiteUrl={d.websiteUrl}
          gameUrl={d.gameUrl}
        />
      </GameDetailContent>
    </GameDetail>
  );
}
