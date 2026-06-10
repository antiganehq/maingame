"use client";

import { CatalogRow, GameCard, SectionHeading } from "@maingame/components";

const MOCK_GAMES = [
  {
    title: "Wayward Warriors",
    slug: "wayward-warriors",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    streamerCount: 12,
  },
  {
    title: "Kopi & Kata",
    slug: "kopi-and-kata",
    coverImage:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2cf0?q=80&w=600&auto=format&fit=crop",
    streamerCount: 5,
  },
  {
    title: "Neon Siege",
    slug: "neon-siege",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    streamerCount: 18,
  },
  {
    title: "Realm Runners",
    slug: "realm-runners",
    coverImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
    streamerCount: 7,
  },
  {
    title: "Skybound Arena",
    slug: "skybound-arena",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    streamerCount: 3,
  },
  {
    title: "Mecha Rivals",
    slug: "mecha-rivals",
    coverImage:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=600&auto=format&fit=crop",
    streamerCount: 9,
  },
  {
    title: "Phantom Protocol",
    slug: "phantom-protocol",
    coverImage:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    streamerCount: 14,
  },
  {
    title: "Drift Zone",
    slug: "drift-zone",
    coverImage:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop",
    streamerCount: 6,
  },
  {
    title: "Echo Realms",
    slug: "echo-realms",
    coverImage:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=600&auto=format&fit=crop",
    streamerCount: 11,
  },
  {
    title: "Shadow Circuit",
    slug: "shadow-circuit",
    coverImage:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=600&auto=format&fit=crop",
    streamerCount: 4,
  },
  {
    title: "Crystal Vanguard",
    slug: "crystal-vanguard",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    streamerCount: 8,
  },
  {
    title: "Warpath Tactics",
    slug: "warpath-tactics",
    coverImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
    streamerCount: 2,
  },
];

export function GameSection() {
  return (
    <CatalogRow
      heading={
        <SectionHeading text1="Categories" text2="we think you'll like" />
      }
      items={MOCK_GAMES}
      renderItem={(item) => <GameCard {...item} />}
    />
  );
}
