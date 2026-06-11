import Link from "next/link";
import { SectionHeading } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";
import { allGames, allStreamers } from "@maingame/db";
import Stats10 from "@/shared/components/common/stats-10";
import type { StatCardData } from "@/shared/components/common/stats-10";

const PLATFORM_LABEL: Record<string, string> = {
  [StreamPlatform.Twitch]: "Twitch",
  [StreamPlatform.YouTube]: "YouTube",
  [StreamPlatform.Kick]: "Kick",
  [StreamPlatform.Other]: "Other",
};

export default function ProHome() {
  const totalCampaigns = allStreamers.reduce(
    (sum, s) => sum + s.campaignCount,
    0,
  );

  const activeCampaigns = allStreamers.reduce((sum, s) => {
    return (
      sum +
      s.recentCampaigns.filter((c) =>
        ["SCHEDULED", "SUBMITTED", "FUNDED", "ACCEPTED"].includes(c.status),
      ).length
    );
  }, 0);

  const statCards: StatCardData[] = [
    {
      value: allGames.length,
      label: "Total games listed on the platform",
    },
    {
      value: allStreamers.length,
      label: "Streamers ready for campaigns",
    },
    {
      value: totalCampaigns,
      label: "Campaigns created across all games",
    },
    {
      value: activeCampaigns,
      label: "Active campaigns in progress",
    },
  ];

  const topGames = allGames
    .filter((g) => g.status === "PUBLISHED")
    .sort((a, b) => b.streamerCount - a.streamerCount)
    .slice(0, 10);

  const topStreamers = [...allStreamers]
    .sort((a, b) => b.campaignCount - a.campaignCount)
    .slice(0, 10);

  return (
    <main className="min-h-screen">
      <Stats10 cards={statCards} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
        {/* Top 10 Games */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionHeading text1="Top 10" text2="Games" />
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors no-underline"
            >
              Show all
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="overflow-hidden border border-[var(--color-border)]">
            {topGames.length === 0 ? (
              <div className="p-12 text-center text-sm text-[var(--color-muted-foreground)]">
                No games yet. Be the first to list yours.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">
                    <th className="w-12 px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Game</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">
                      Studio
                    </th>
                    <th className="px-4 py-3 font-medium text-right">
                      Streamers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topGames.map((game, i) => (
                    <tr
                      key={game.id}
                      className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                      <td className="px-4 py-3 text-[var(--color-muted-foreground)] font-mono tabular-nums">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/games/${game.slug}`}
                          className="flex items-center gap-3 no-underline text-[var(--color-foreground)] hover:text-[var(--color-brand)] transition-colors"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-[var(--color-surface)] text-xs">
                            {game.coverImage ? (
                              <img
                                src={game.coverImage}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-[var(--color-muted-foreground)]">
                                ?
                              </span>
                            )}
                          </span>
                          <span className="font-medium truncate max-w-[200px]">
                            {game.title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[var(--color-muted-foreground)] hidden sm:table-cell">
                        {game.developer.studioName}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums">
                        {game.streamerCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Top 10 Streamers */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionHeading text1="Top 10" text2="Streamers" />
            <Link
              href="/streamers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors no-underline"
            >
              Show all
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="overflow-hidden border border-[var(--color-border)]">
            {topStreamers.length === 0 ? (
              <div className="p-12 text-center text-sm text-[var(--color-muted-foreground)]">
                No streamers yet.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">
                    <th className="w-12 px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Streamer</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">
                      Platform
                    </th>
                    <th className="px-4 py-3 font-medium text-right">
                      Campaigns
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topStreamers.map((streamer, i) => (
                    <tr
                      key={streamer.slug}
                      className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors"
                    >
                      <td className="px-4 py-3 text-[var(--color-muted-foreground)] font-mono tabular-nums">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/streamers/${streamer.slug}`}
                          className="flex items-center gap-3 no-underline text-[var(--color-foreground)] hover:text-[var(--color-brand)] transition-colors"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-[var(--color-surface)] text-xs">
                            {streamer.avatarUrl ? (
                              <img
                                src={streamer.avatarUrl}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="font-bold text-[var(--color-brand)]">
                                {streamer.displayName.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </span>
                          <span className="font-medium truncate max-w-[200px]">
                            {streamer.displayName}
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[var(--color-muted-foreground)] hidden sm:table-cell">
                        {PLATFORM_LABEL[streamer.primaryPlatform] ??
                          streamer.primaryPlatform}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums">
                        {streamer.campaignCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
