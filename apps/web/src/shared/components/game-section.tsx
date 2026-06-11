"use client";

import { CatalogRow, GameCard, SectionHeading } from "@maingame/components";
import { streamingGames } from "@maingame/db";

export function GameSection() {
  return (
    <CatalogRow
      heading={
        <SectionHeading text1="Categories" text2="we think you'll like" />
      }
      items={streamingGames}
      renderItem={(item) => <GameCard {...item} />}
    />
  );
}
