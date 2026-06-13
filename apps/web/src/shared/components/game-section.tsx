"use client";

import {
  CatalogRowWithSeeAll,
  VerticalGameCard,
  SeeAllGamesCard,
  SectionHeading,
} from "@maingame/components";
import { streamingGames } from "@maingame/db";

export function GameSection() {
  return (
    <CatalogRowWithSeeAll
      heading={<SectionHeading text1="Latest" text2="Games" />}
      items={streamingGames}
      seeAllCard={<SeeAllGamesCard />}
      renderItem={(item) => <VerticalGameCard {...item} />}
    />
  );
}
