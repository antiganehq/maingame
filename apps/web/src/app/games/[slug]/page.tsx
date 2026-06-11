import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GameDetail,
  GameDetailHero,
  GameDetailGlance,
  GameDetailContent,
  GameDetailSidebar,
  type GameDetailData,
  CommentsSection,
  SectionHeading,
} from "@maingame/components";
import { getGame } from "@maingame/db";
import type { GameData } from "@maingame/db";

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
  const game = getGame(slug);

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
  if (!game) notFound();

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

          <section>
            <SectionHeading text1="About" text2="This Game" />
          </section>

          <CommentsSection gameId={game.id} streamers={game.streamers} />
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
