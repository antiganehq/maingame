"use client";

import { useState } from "react";
import { SectionHeading, StarRatingDisplay } from "@maingame/components";
import type { StreamerDetailData } from "@maingame/db";

const TABS = ["Overview", "Videos"] as const;

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function formatRating(v: number): string {
  return v.toFixed(1);
}

export function StreamerDetailContent({
  streamer,
}: {
  streamer: StreamerDetailData;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");

  return (
    <div className="py-6 space-y-6">
      <div className="flex border-b border-[var(--color-border-light)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
              tab === t
                ? "border-[var(--color-brand)] text-[var(--color-foreground)]"
                : "border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="space-y-8">
          {streamer.streamArchives.length > 0 && (
            <section>
              <SectionHeading text1="Recent" text2="Videos" />
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {streamer.streamArchives.slice(0, 4).map((archive) => (
                  <a
                    key={archive.id}
                    href={archive.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-[260px] shrink-0"
                  >
                    <div className="aspect-video relative overflow-hidden group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200">
                      <img
                        src={archive.thumbnailUrl}
                        alt={archive.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-sm font-medium text-[var(--color-foreground)] leading-snug line-clamp-2">
                        {archive.title}
                      </h4>
                      <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                        {archive.gameName} &middot;{" "}
                        {new Date(archive.playedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      {tab === "Videos" && (
        <div>
          {streamer.streamArchives.length === 0 ? (
            <p className="text-sm text-[var(--color-muted-foreground)]">No videos yet.</p>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
              {streamer.streamArchives.map((archive) => (
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
                    <h4 className="text-sm font-medium text-[var(--color-foreground)] leading-snug line-clamp-2">
                      {archive.title}
                    </h4>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                      {archive.gameName} &middot;{" "}
                      {new Date(archive.playedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
