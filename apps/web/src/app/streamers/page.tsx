import type { Metadata } from "next";
import { CatalogGrid, StreamerCard, SectionHeading } from "@maingame/components";
import { Badge } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";
import { getStreamingStreamers } from "@/features/streamer/data/streamers";

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

type StreamerItem = {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  viewerCount: number;
};

export const metadata: Metadata = {
  title: "Streaming Today — maingame.fun",
  description: "Watch games being streamed live right now.",
};

export default function StreamersPage() {
  const streamers = getStreamingStreamers();

  const items: StreamerItem[] = streamers.map((s) => ({
    displayName: s.displayName,
    slug: s.slug,
    avatarUrl: s.avatarUrl,
    primaryPlatform: s.primaryPlatform,
    viewerCount: s.viewerCount,
  }));

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-[1400px] flex flex-col gap-4">
        <SectionHeading text1="Streaming" text2="Today" />
        <CatalogGrid
          items={items}
          renderItem={(item) => (
            <StreamerCard
              displayName={item.displayName}
              slug={item.slug}
              avatarUrl={item.avatarUrl}
              primaryPlatform={item.primaryPlatform}
              badge={
                <Badge variant="danger" className="text-[10px] font-bold px-1.5 py-0.5">
                  LIVE
                </Badge>
              }
              meta={`${formatViewers(item.viewerCount)} viewers`}
            />
          )}
        />
      </div>
    </main>
  );
}
