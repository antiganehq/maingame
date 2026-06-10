import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScreenshotGallery } from "@/components/game/screenshot-gallery";
import { GameSidebar } from "@/components/game/game-sidebar";

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
  coverImage: string | null;
  screenshots: string[];
  trailerUrl: string | null;
  gameUrl: string | null;
  campaignObjective: string | null;
  budgetMinDots: number | null;
  budgetMaxDots: number | null;
  status: string;
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
      "A fast-paced action RPG set in a mythical archipelago. Battle creatures from Indonesian legends and uncover ancient secrets.",
    genre: "Action RPG",
    platforms: ["PC", "Steam"],
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/waywardwarriors",
    campaignObjective: "Drive wishlist adds and demo downloads ahead of Steam Next Fest.",
    budgetMinDots: 3000,
    budgetMaxDots: 8000,
    status: "PUBLISHED",
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    developer: {
      id: "dev-001",
      studioName: "Nusantara Games",
      slug: "nusantara-games",
      bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore.",
      website: "https://nusantaragames.id",
    },
  },

  "kopi-dan-kata": {
    id: "game-002",
    developerId: "dev-001",
    title: "Kopi & Kata",
    slug: "kopi-dan-kata",
    description:
      "A cozy narrative game about running a small coffee shop in Yogyakarta. Listen to customers' stories, brew drinks, and shape the neighborhood.",
    genre: "Simulation / Narrative",
    platforms: ["PC", "Mac", "Steam"],
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/kopidankata",
    campaignObjective: "Reach cozy game audiences in SEA and Japan.",
    budgetMinDots: 2000,
    budgetMaxDots: 5000,
    status: "PUBLISHED",
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    developer: {
      id: "dev-001",
      studioName: "Nusantara Games",
      slug: "nusantara-games",
      bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore.",
      website: "https://nusantaragames.id",
    },
  },

  "neon-siege": {
    id: "game-003",
    developerId: "dev-002",
    title: "Neon Siege",
    slug: "neon-siege",
    description:
      "A cyberpunk tactical shooter where every run is different. Assemble your crew, breach corporate fortresses, and extract before the grid goes dark.",
    genre: "Tactical Shooter",
    platforms: ["PC", "PlayStation 5", "Xbox Series X"],
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b26?w=1200&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    gameUrl: "https://store.steampowered.com/app/neonsiege",
    campaignObjective: "Build launch week momentum with 20+ streamers across PC and console.",
    budgetMinDots: 10000,
    budgetMaxDots: 25000,
    status: "PUBLISHED",
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

const statusLabel: Record<string, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  PAUSED: "Paused",
  ARCHIVED: "Archived",
  REJECTED: "Rejected",
};

function getGame(slug: string): GameData {
  const game = GAMES[slug];
  if (!game) notFound();
  return game;
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

  const hasMedia = game.screenshots.length > 0 || game.trailerUrl;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero Banner */}
      <section className="relative w-full">
        {game.coverImage ? (
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[450px] overflow-hidden">
            <Image
              src={game.coverImage}
              alt={game.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {game.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href={`/streamers/${game.developer.slug}`}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  by {game.developer.studioName}
                </Link>
                <span className="text-white/40">·</span>
                <span className="text-xs text-white/60">
                  {statusLabel[game.status] ?? game.status}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[200px] sm:h-[280px] bg-[var(--color-surface)] flex items-center justify-center">
            <span className="text-[var(--color-muted-foreground)] text-sm">No cover image</span>
          </div>
        )}
      </section>

      {/* Media Carousel Strip */}
      {hasMedia && (
        <section className="bg-[var(--color-section)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted)] mb-3">
              Screenshots &amp; Videos
            </p>
            <ScreenshotGallery
              screenshots={game.screenshots}
              title={game.title}
              trailerUrl={game.trailerUrl}
            />
          </div>
        </section>
      )}

      {/* Two-Column Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:flex lg:gap-12">
          {/* Left Column — Main Content */}
          <div className="lg:flex-1 lg:min-w-0 space-y-8">
            {/* About This Game */}
            <section>
              <h2 className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-3">
                About This Game
              </h2>
              <div className="text-sm text-[var(--color-muted-foreground)] leading-relaxed space-y-3">
                {game.description.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Campaign Details */}
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
                </div>
              </section>
            )}

            {/* About Developer (below campaign on left, as extended info) */}
            {game.developer.bio && (
              <section>
                <h2 className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-3">
                  About The Developer
                </h2>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                  {game.developer.bio}
                </p>
              </section>
            )}
          </div>

          {/* Right Column — Sidebar */}
          <div className="mt-8 lg:mt-0 lg:w-[320px] lg:flex-shrink-0">
            <GameSidebar
              coverImage={game.coverImage}
              title={game.title}
              developer={game.developer}
              genre={game.genre}
              platforms={game.platforms}
              status={game.status}
              statusLabel={statusLabel[game.status] ?? game.status}
              budgetMinDots={game.budgetMinDots}
              budgetMaxDots={game.budgetMaxDots}
              gameUrl={game.gameUrl}
              campaignObjective={game.campaignObjective}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
