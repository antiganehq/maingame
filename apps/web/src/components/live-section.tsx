import { StreamerCard } from "./streamer-card";

const MOCK_STREAMERS = [
  {
    streamerName: "BayuPlays",
    streamerSlug: "bayuplays",
    streamTitle: "Wayward Warriors — Road to Rank 1 with Viewers! Come Join the Chaos",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    viewerCount: 1247,
    gameName: "Wayward Warriors",
  },
  {
    streamerName: "MeiCasts",
    streamerSlug: "meicasts",
    streamTitle: "Late Night Kopi & Kata — Chill vibes, cozy puzzles, let's relax",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2cf0?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    viewerCount: 843,
    gameName: "Kopi & Kata",
  },
  {
    streamerName: "DimasArena",
    streamerSlug: "dimasarena",
    streamTitle: "Neon Siege Tournament Finals — $500 Prize Pool! Who Takes It?",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    viewerCount: 3200,
    gameName: "Neon Siege",
  },
  {
    streamerName: "SariGaming",
    streamerSlug: "sarigaming",
    streamTitle: "Realm Runners First Playthrough — This game is INSANE",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    viewerCount: 562,
    gameName: "Realm Runners",
  },
  {
    streamerName: "RizkyLive",
    streamerSlug: "rizkylive",
    streamTitle: "Mecha Rivals Season 3 Grind — New Mecha Builds, New Meta!",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    viewerCount: 2198,
    gameName: "Mecha Rivals",
  },
  {
    streamerName: "LunaStreams",
    streamerSlug: "lunastreams",
    streamTitle: "Phantom Protocol Speedrun Attempt — World Record Pace!",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    viewerCount: 4100,
    gameName: "Phantom Protocol",
  },
  {
    streamerName: "AgungGG",
    streamerSlug: "agunggg",
    streamTitle: "Drift Zone Drift King Challenge — Can You Beat My Score?",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    viewerCount: 731,
    gameName: "Drift Zone",
  },
  {
    streamerName: "CitraPlays",
    streamerSlug: "citraplays",
    streamTitle: "Echo Realms Exploration — Finding All Hidden Lore Secrets",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=800&auto=format&fit=crop",
    profileUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
    viewerCount: 389,
    gameName: "Echo Realms",
  },
];

export function LiveSection() {
  return (
    <section className="bg-[var(--color-section)] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[var(--color-section-foreground)] text-2xl sm:text-3xl font-bold">
          Currently Live
        </h2>
        <div className="w-12 h-1 bg-[var(--color-brand)] rounded-full mt-2 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MOCK_STREAMERS.map((streamer) => (
            <StreamerCard key={streamer.streamerSlug} {...streamer} />
          ))}
        </div>
      </div>
    </section>
  );
}
