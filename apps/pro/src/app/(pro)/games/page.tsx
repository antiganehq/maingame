import type { Metadata } from "next";
import { brandCopy } from "@maingame/brand";
import {
  Card,
  CardDescription,
  CardTitle,
  CatalogGrid,
  GameCard,
  SectionHeading,
} from "@maingame/components";
import { getAllGames } from "@maingame/db";

export const metadata: Metadata = {
  title: "Games — maingame.fun",
  description: "Manage your game listings and create new campaigns.",
};

export default function GamesPage() {
  const games = getAllGames();

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-[1400px] flex flex-col gap-4">
        <SectionHeading text1="All" text2="Games" />
        <div>
          {games.length === 0 ? (
            <Card>
              <CardTitle>No games yet</CardTitle>
              <CardDescription>{brandCopy.emptyStateGames}</CardDescription>
            </Card>
          ) : (
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
          )}
        </div>
      </div>
    </main>
  );
}
