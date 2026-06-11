import type { Metadata } from "next";
import { CatalogGrid, GameCard, SectionHeading } from "@maingame/components";
import { getStreamingToday } from "@/features/game/data/public-games";

export const metadata: Metadata = {
  title: "Streaming Today — maingame.fun",
  description: "Discover games being streamed right now.",
};

export default function GamesPage() {
  const games = getStreamingToday();

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-[1400px] flex flex-col gap-4">
        <SectionHeading text1="Streaming" text2="Today" />
        <CatalogGrid
          items={games}
          renderItem={(g) => (
            <GameCard
              title={g.title}
              slug={g.slug}
              coverImage={g.coverImage}
              streamerCount={g.streamerCount}
              meta={
                <>
                  {g.genre}
                  {g.platforms.length > 0 && ` · ${g.platforms.join(", ")}`}
                </>
              }
            />
          )}
        />
      </div>
    </main>
  );
}
