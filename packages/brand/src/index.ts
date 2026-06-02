export const appName = "maingame.fun";

export const urls = {
  web: "https://maingame.fun",
  pro: "https://pro.maingame.fun",
  api: "https://api.maingame.fun",
  localWeb: "http://localhost:3000",
  localPro: "http://localhost:3001",
  localApi: "http://localhost:8787"
} as const;

export const tagline = "Paid streamer campaigns for game studios.";

export const publicNavigation = [
  { label: "Games", href: "/games" },
  { label: "Streaming Today", href: "/today" },
  { label: "Streamers", href: "/streamers" },
  { label: "Archives", href: "/archives" }
] as const;

export const proNavigation = [
  { label: "Dashboard", href: "/" },
  { label: "Games", href: "/games" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Streamers", href: "/streamers" },
  { label: "Dots", href: "/dots" }
] as const;

export const brandCopy = {
  publicHeroTitle: "Find the games being streamed today.",
  publicHeroBody:
    "maingame.fun connects game studios with streamers through focused paid campaigns.",
  proHeroTitle: "Run streamer campaigns from one dashboard.",
  proHeroBody:
    "Create game listings, fund campaigns with Dots, schedule streams, and approve completed work."
} as const;
