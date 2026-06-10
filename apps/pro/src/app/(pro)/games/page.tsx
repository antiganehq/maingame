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
import { getAllGames } from "@/features/game/data/games";
import { Showcase3 } from "@/shared/components/common/showcase-3";

export const metadata: Metadata = {
  title: "Games — maingame.fun",
  description: "Manage your game listings and create new campaigns.",
};

export default function GamesPage() {
  const games = getAllGames();

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-[1400px] flex max-md:flex-col gap-4 max-md:gap-8">
        <div className="md:order-2 md:max-w-90">
          <Showcase3 />
        </div>
        <section className="flex flex-col md:order-1 gap-4 w-full">
          <div className="flex items-center justify-between">
            <SectionHeading text1="All" text2="Games" />
          </div>
          <div>
            {games.length === 0 ? (
              <Card>
                <CardTitle>No games yet</CardTitle>
                <CardDescription>{brandCopy.emptyStateGames}</CardDescription>
              </Card>
            ) : (
              <CatalogGrid
                items={games.map((g) => ({
                  title: g.title,
                  slug: g.slug,
                  coverImage: g.coverImage,
                  streamerCount: g.streamerCount,
                }))}
                renderItem={(item) => <GameCard {...item} />}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
