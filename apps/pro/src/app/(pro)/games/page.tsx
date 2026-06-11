"use client";

import { useState, useMemo } from "react";
import { brandCopy } from "@maingame/brand";
import {
  Card,
  CardDescription,
  CardTitle,
  CatalogGrid,
  GameCard,
  Input,
  Select,
  SectionHeading,
} from "@maingame/components";
import { getAllGames } from "@maingame/db";

const allGames = getAllGames();

const GENRES = [
  ...new Set(allGames.map((g) => g.genre).filter(Boolean) as string[]),
].sort();

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const filtered = useMemo(() => {
    let result = allGames;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((g) => g.title.toLowerCase().includes(q));
    }

    if (genre) {
      result = result.filter((g) => g.genre === genre);
    }

    return result;
  }, [search, genre]);

  const hasFilters = search.trim().length > 0 || genre !== "";

  function clearFilters() {
    setSearch("");
    setGenre("");
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-[1400px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SectionHeading text1="All" text2="Games" />
          <span className="text-sm text-[var(--color-muted-foreground)] tabular-nums">
            {filtered.length} of {allGames.length}
          </span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] pointer-events-none">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="flex h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] pl-10 pr-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-2"
            />
          </div>

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="flex h-10 w-full sm:w-48 rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-2"
          >
            <option value="">All Genres</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center h-10 px-4 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <Card>
              <CardTitle>
                {hasFilters
                  ? "No games match your filters"
                  : "No games yet"}
              </CardTitle>
              <CardDescription>
                {hasFilters
                  ? "Try adjusting your search or genre filter."
                  : brandCopy.emptyStateGames}
              </CardDescription>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-sm font-medium text-[var(--color-brand)] hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </Card>
          ) : (
            <CatalogGrid
              items={filtered}
              renderItem={(g) => (
                <GameCard
                  title={g.title}
                  slug={g.slug}
                  coverImage={g.coverImage}
                  streamerCount={g.streamerCount}
                  meta={
                    <>
                      {g.genre}
                      {g.platforms.length > 0 &&
                        ` · ${g.platforms.join(", ")}`}
                    </>
                  }
                />
              )}
            />
          )}
        </div>
      </div>
    </main>
  );
}
