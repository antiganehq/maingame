import { StreamPlatform } from "@maingame/types";

export interface ScheduledStream {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  gameTitle: string;
  scheduledAt: Date;
  durationMinutes: number;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

function onDay(dayOffset: number, hour: number, minute = 0): Date {
  const d = new Date(today);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const STREAMERS = [
  {
    displayName: "BayuPlays",
    slug: "bayuplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
  },
  {
    displayName: "MeiCasts",
    slug: "meicasts",
    avatarUrl:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2cf0?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
  },
  {
    displayName: "DimasArena",
    slug: "dimasarena",
    avatarUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
  },
  {
    displayName: "SariGaming",
    slug: "sarigaming",
    avatarUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
  },
  {
    displayName: "RizkyLive",
    slug: "rizkylive",
    avatarUrl:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
  },
  {
    displayName: "LunaStreams",
    slug: "lunastreams",
    avatarUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.YouTube,
  },
  {
    displayName: "AgungGG",
    slug: "agunggg",
    avatarUrl:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Kick,
  },
  {
    displayName: "CitraPlays",
    slug: "citraplays",
    avatarUrl:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=800&auto=format&fit=crop",
    primaryPlatform: StreamPlatform.Twitch,
  },
];

const GAMES = [
  "Realm Runners",
  "Neon Drift",
  "Warpath Tactics",
  "Starbound Legends",
  "Cyber Arena",
  "Mystic Realms",
  "Pixel Pirates",
  "Shadow Protocol",
  "Crystal Kingdoms",
  "Void Runners",
];

const SCHEDULE_TEMPLATE = [
  { hour: 7, minute: 0, duration: 120 },
  { hour: 9, minute: 30, duration: 180 },
  { hour: 12, minute: 0, duration: 90 },
  { hour: 14, minute: 0, duration: 150 },
  { hour: 16, minute: 30, duration: 120 },
  { hour: 19, minute: 0, duration: 240 },
  { hour: 21, minute: 0, duration: 90 },
];

function generateWeekStreams(): ScheduledStream[] {
  const streams: ScheduledStream[] = [];

  for (let day = -3; day <= 3; day++) {
    const dayStreams = SCHEDULE_TEMPLATE.filter(() => Math.random() > 0.3);
    const shuffled = [...dayStreams].sort(() => Math.random() - 0.5);
    const count = 2 + Math.floor(Math.random() * 4);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const template = shuffled[i];
      const streamer = STREAMERS[Math.floor(Math.random() * STREAMERS.length)];
      const game = GAMES[Math.floor(Math.random() * GAMES.length)];

      streams.push({
        ...streamer,
        gameTitle: game,
        scheduledAt: onDay(day, template.hour, template.minute),
        durationMinutes: template.duration,
      });
    }
  }

  return streams.sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
}

export const scheduledStreams: ScheduledStream[] = generateWeekStreams();

export function groupByHour(
  streams: ScheduledStream[]
): Map<number, ScheduledStream[]> {
  const map = new Map<number, ScheduledStream[]>();
  for (const stream of streams) {
    const hour = stream.scheduledAt.getHours();
    if (!map.has(hour)) {
      map.set(hour, []);
    }
    map.get(hour)!.push(stream);
  }
  return map;
}

export function groupByDay(
  streams: ScheduledStream[]
): Map<string, ScheduledStream[]> {
  const map = new Map<string, ScheduledStream[]>();
  for (const stream of streams) {
    const key = stream.scheduledAt.toDateString();
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(stream);
  }
  return map;
}

export function getStreamsForDay(
  streams: ScheduledStream[],
  date: Date
): ScheduledStream[] {
  return streams.filter(
    (s) => s.scheduledAt.toDateString() === date.toDateString()
  );
}

export function getStreamsForMonth(
  streams: ScheduledStream[],
  year: number,
  month: number
): ScheduledStream[] {
  return streams.filter(
    (s) =>
      s.scheduledAt.getFullYear() === year && s.scheduledAt.getMonth() === month
  );
}

export function getScheduledStreams(): ScheduledStream[] {
  return scheduledStreams;
}
