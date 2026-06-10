"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GameCard } from "./game-card";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-(--color-foreground) text-2xl sm:text-xl">
              <span className="text-(--color-brand) font-display">
                Categories{" "}
              </span>
              <span>we think you&apos;ll like</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-200)] text-[var(--color-foreground)] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-200)] text-[var(--color-foreground)] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto p-2 -m-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MOCK_GAMES.map((game) => (
            <div
              key={game.slug}
              className="flex-shrink-0 w-[calc((100%-2.25rem)/4)] sm:w-[calc((100%-4rem)/5)] md:w-[calc((100%-5rem)/6)] lg:w-[calc((100%-6rem)/7)]"
            >
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
