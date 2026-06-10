import type { Metadata } from "next";
import { CatalogGrid, StreamerCard, SectionHeading } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";
import { availableStreamers } from "@/features/streamer/data/streamers";

type StreamerItem = {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  campaignCount: number;
};

export const metadata: Metadata = {
  title: "Streamers — maingame.fun",
  description: "Discover streamers for your next campaign.",
};

export default function StreamersPage() {
  const items: StreamerItem[] = availableStreamers.map((s) => ({
    displayName: s.displayName,
    slug: s.slug,
    avatarUrl: s.avatarUrl,
    primaryPlatform: s.primaryPlatform,
    campaignCount: s.campaignCount,
  }));

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-[1400px] flex flex-col gap-4">
        <SectionHeading text1="All" text2="Streamers" />
        <CatalogGrid
          items={items}
          renderItem={(item) => (
            <StreamerCard
              displayName={item.displayName}
              slug={item.slug}
              avatarUrl={item.avatarUrl}
              primaryPlatform={item.primaryPlatform}
              meta={`${item.campaignCount} campaign${item.campaignCount === 1 ? "" : "s"}`}
            />
          )}
        />
      </div>
    </main>
  );
}
