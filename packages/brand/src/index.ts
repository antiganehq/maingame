export const appName = "maingame.fun";

export const shortName = "maingame";

export const tagline = "Where games meet their audience.";
export const tagline1 = "Where games meet";
export const tagline2 = "their audience.";

export const positioning =
  "maingame.fun is the marketplace where game studios fund streamer campaigns and creators discover paid opportunities to play games they love.";

export const urls = {
  web: "https://maingame.fun",
  pro: "https://pro.maingame.fun",
  api: "https://api.maingame.fun",
  localWeb: "http://localhost:3000",
  localPro: "http://localhost:3001",
  localApi: "http://localhost:8787"
} as const;

export const socialLinks = {
  twitter: "https://x.com/maingamefun",
  discord: "https://discord.gg/maingamefun",
  github: "https://github.com/maingamefun",
  linkedin: "https://linkedin.com/company/maingamefun",
  youtube: "https://youtube.com/@maingamefun"
} as const;

export const publicNavigation = [
  { label: "Games", href: "/games" },
  { label: "Streaming Today", href: "/streamers" },
] as const;

export const proNavigation = [
  { label: "Games", href: "/games" },
  { label: "Streamers", href: "/streamers" },
] as const;

export const ctaCopy = {
  primary: "Get Started",
  secondary: "Browse Games",
  streamer: "Start Streaming",
  gamedev: "Launch a Campaign",
  login: "Sign In",
  signup: "Create Account",
  pro: "Go to Pro Dashboard",
  learnMore: "Learn More"
} as const;

export const brandCopy = {
  publicHeroTitle: "Find the games being streamed today.",
  publicHeroBody:
    "maingame.fun connects game studios with streamers through focused paid campaigns. Discover what's live, what's coming, and who's playing.",
  publicSubHero: "Built for creators. Funded by studios. Powered by community.",
  proHeroTitle: "Run streamer campaigns from one dashboard.",
  proHeroBody:
    "Create game listings, fund campaigns with Dots, schedule streams, and approve completed work. All in one place.",
  proSubHero: "Less admin. More play. Get your game in front of the right audience.",
  emptyStateGames: "No games yet. Be the first to list yours.",
  emptyStateCampaigns: "No campaigns yet. Start by creating a game.",
  emptyStateStreams: "Nothing streaming right now. Check back soon!",
  footerTagline: "Connecting game studios with the streamers who bring them to life.",
  footerDescription:
    "maingame.fun is the campaign marketplace for game developers and content creators."
} as const;

export const metadataDefaults = {
  title: appName,
  description: tagline,
  keywords: [
    "game marketing",
    "streamer campaigns",
    "game streaming",
    "indie games",
    "content creators",
    "game discovery",
    "Twitch",
    "YouTube Gaming",
    "Kick"
  ],
  openGraph: {
    siteName: appName,
    locale: "en_US",
    type: "website" as const
  },
  twitter: {
    handle: "@maingamefun",
    card: "summary_large_image" as const
  }
} as const;

export const tone = {
  voice: "playful, creator-friendly, modern, and trustworthy",
  do: [
    "Use conversational language",
    "Celebrate creators and studios equally",
    "Keep copy short and scannable",
    "Use active voice",
    "Be specific about value"
  ],
  dont: [
    "Use corporate jargon",
    "Sound like a SaaS product",
    "Over-promise or hype",
    "Use crypto or Web3 terminology",
    "Talk down to creators or studios"
  ]
} as const;
