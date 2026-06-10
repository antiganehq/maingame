import { SectionHeading, StreamerCard, CatalogGrid, Badge } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";

type StreamerItem = {
  displayName: string;
  slug: string;
  avatarUrl: string;
  viewerCount: number;
  primaryPlatform: StreamPlatform;
};

const MOCK_STREAMERS: StreamerItem[] = [
  {
    displayName: "BayuPlays",
    slug: "bayuplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    viewerCount: 1247,
    primaryPlatform: StreamPlatform.Twitch,
  },
  {
    displayName: "MeiCasts",
    slug: "meicasts",
    avatarUrl:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2cf0?q=80&w=800&auto=format&fit=crop",
    viewerCount: 843,
    primaryPlatform: StreamPlatform.YouTube,
  },
  {
    displayName: "DimasArena",
    slug: "dimasarena",
    avatarUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    viewerCount: 3200,
    primaryPlatform: StreamPlatform.Twitch,
  },
  {
    displayName: "SariGaming",
    slug: "sarigaming",
    avatarUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    viewerCount: 562,
    primaryPlatform: StreamPlatform.Kick,
  },
  {
    displayName: "RizkyLive",
    slug: "rizkylive",
    avatarUrl:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
    viewerCount: 2198,
    primaryPlatform: StreamPlatform.Twitch,
  },
  {
    displayName: "LunaStreams",
    slug: "lunastreams",
    avatarUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    viewerCount: 4100,
    primaryPlatform: StreamPlatform.YouTube,
  },
  {
    displayName: "AgungGG",
    slug: "agunggg",
    avatarUrl:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    viewerCount: 731,
    primaryPlatform: StreamPlatform.Kick,
  },
  {
    displayName: "CitraPlays",
    slug: "citraplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=800&auto=format&fit=crop",
    viewerCount: 389,
    primaryPlatform: StreamPlatform.Twitch,
  },
];

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
          items={MOCK_STREAMERS}
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
