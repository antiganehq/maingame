import { SectionHeading, StreamerCard, CatalogGrid, Badge } from "@maingame/components";
import { streamingStreamers } from "@maingame/db";

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function LiveSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-4">
          <SectionHeading text1="Live" text2="Now" />
        </div>

        <CatalogGrid
          items={streamingStreamers}
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
    </section>
  );
}
