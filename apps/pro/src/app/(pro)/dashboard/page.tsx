"use client";

import { useState } from "react";
import { GameCard, CatalogGrid } from "@maingame/components";
import { Button } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";
import { allGames, allStreamers } from "@maingame/db";

const PROFILE = {
  displayName: "Nusantara Games",
  slug: "nusantara-games",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  bannerUrl: null,
  channelUrl: "https://twitch.tv/nusantaragames",
  primaryPlatform: StreamPlatform.Twitch,
  subscriberCount: 12400,
  totalStreams: 48,
};

const PLATFORM_LABEL: Record<string, string> = {
  [StreamPlatform.Twitch]: "Twitch",
  [StreamPlatform.YouTube]: "YouTube",
  [StreamPlatform.Kick]: "Kick",
};

const TABS = ["Games", "Streams"] as const;

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Games");

  const myGames = allGames.filter(
    (g) => g.developer.studioName === "Nusantara Games",
  );
  const myStreams = allStreamers[0]?.streamArchives ?? [];

  const statCards = [
    { label: "Subscribers", value: formatCount(PROFILE.subscriberCount) },
    { label: "Streams", value: String(PROFILE.totalStreams) },
    { label: "Games", value: String(myGames.length) },
  ];

  return (
    <div>
      {/* Banner */}
      <section className="relative h-48 md:h-60 bg-[var(--color-section)]">
        {PROFILE.bannerUrl && (
          <img
            src={PROFILE.bannerUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        )}
      </section>

      {/* Profile Info */}
      <section className="px-6 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-end gap-5 -mt-12 mb-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden ring-4 ring-[var(--color-background)] bg-[var(--color-brand)] flex items-center justify-center text-2xl font-bold text-[var(--color-brand-foreground)]">
              {PROFILE.avatarUrl ? (
                <img
                  src={PROFILE.avatarUrl}
                  alt={PROFILE.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                PROFILE.displayName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
                {PROFILE.displayName}
              </h1>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                @{PROFILE.slug} &middot; {myGames.length} games &middot;{" "}
                {PROFILE.totalStreams} streams
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 pb-1">
              <Button variant="secondary">Edit Profile</Button>
              {PROFILE.channelUrl && (
                <a
                  href={PROFILE.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    Watch on {PLATFORM_LABEL[PROFILE.primaryPlatform]}
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="px-6 sm:px-8 md:px-12 pb-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-3 gap-4">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="border border-[var(--color-border-light)] bg-[var(--color-surface)] p-4 text-center"
              >
                <p className="text-xl font-bold text-[var(--color-foreground)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 sm:px-8 md:px-12 border-b border-[var(--color-border-light)]">
        <div className="mx-auto max-w-[1200px] flex gap-0">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                tab === t
                  ? "border-[var(--color-brand)] text-[var(--color-foreground)]"
                  : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 sm:px-8 md:px-12 py-8">
        <div className="mx-auto max-w-[1200px]">
          {tab === "Games" && (
            <>
              {myGames.length === 0 ? (
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  No games published yet.
                </p>
              ) : (
                <CatalogGrid
                  items={myGames}
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
            </>
          )}

          {tab === "Streams" && (
            <>
              {myStreams.length === 0 ? (
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  No stream archives yet.
                </p>
              ) : (
                <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {myStreams.map((archive) => (
                    <a
                      key={archive.id}
                      href={archive.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="aspect-video relative overflow-hidden group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200 group-hover:-translate-y-1">
                        <img
                          src={archive.thumbnailUrl}
                          alt={archive.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-2">
                        <h3 className="text-sm font-medium text-[var(--color-foreground)] leading-snug line-clamp-2">
                          {archive.title}
                        </h3>
                        <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                          {archive.gameName} &middot;{" "}
                          {new Date(archive.playedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
