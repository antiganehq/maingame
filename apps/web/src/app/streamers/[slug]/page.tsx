import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  StreamerDetailHero,
  SectionHeading,
  GameCard,
  Card,
  StarRatingDisplay,
} from "@maingame/components";
import { getStreamer } from "@maingame/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const streamer = getStreamer(slug);
  if (!streamer) return { title: "Streamer not found — maingame.fun" };
  return {
    title: `${streamer.displayName} — maingame.fun`,
    description: streamer.bio.slice(0, 160),
  };
}

function formatRating(v: number): string {
  return v.toFixed(1);
}

export default async function StreamerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const streamer = getStreamer(slug);
  if (!streamer) notFound();

  return (
    <main className="min-h-screen text-[var(--color-foreground)]">
      <StreamerDetailHero
        displayName={streamer.displayName}
        primaryPlatform={streamer.primaryPlatform}
        channelUrl={streamer.channelUrl}
        avatarUrl={streamer.avatarUrl}
        meta={
          <>
            {streamer.campaignCount} campaign
            {streamer.campaignCount !== 1 ? "s" : ""} &middot; Member
            since{" "}
            {new Date(streamer.memberSince).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </>
        }
      />

      <div className="mx-auto flex w-full max-w-[1480px] gap-12 px-6 py-8 sm:px-8 md:px-12 max-lg:flex-col">
        <div className="lg:flex-1 lg:min-w-0 space-y-10">
          {/* About */}
          <section>
            <SectionHeading text1="About" text2="" />
            <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              {streamer.bio}
            </p>
          </section>

          {/* Rating */}
          <section>
            <SectionHeading text1="Rating" text2="" />
            <div className="mt-3 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-muted-foreground)]">
                  Game
                </span>
                <StarRatingDisplay value={Math.round(streamer.averageGameRating)} />
                <span className="text-sm font-medium text-[var(--color-foreground)]">
                  {formatRating(streamer.averageGameRating)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-muted-foreground)]">
                  Streamer
                </span>
                <StarRatingDisplay value={Math.round(streamer.averageStreamerRating)} />
                <span className="text-sm font-medium text-[var(--color-foreground)]">
                  {formatRating(streamer.averageStreamerRating)}
                </span>
              </div>
            </div>
          </section>

          {/* Stream Archives */}
          {streamer.streamArchives.length > 0 && (
            <section>
              <SectionHeading text1="Stream" text2="Archives" />
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {streamer.streamArchives.map((archive) => (
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

          {/* Recent Campaigns */}
          {streamer.recentCampaigns.length > 0 && (
            <section>
              <SectionHeading text1="Recent" text2="Campaigns" />
              <div className="mt-3 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {streamer.recentCampaigns.map((campaign) => (
                  <div key={campaign.gameSlug} className="space-y-1">
                    <GameCard
                      title={campaign.gameTitle}
                      slug={campaign.gameSlug}
                      coverImage={campaign.gameCoverImage}
                      streamerCount={0}
                    />
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {campaign.status} &middot;{" "}
                      {campaign.amountDots.toLocaleString()} Dots
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex w-full shrink-0 flex-col gap-4 lg:max-w-[360px]">
          <Card>
            <dl className="space-y-4">
              <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                <dt className="text-sm text-[var(--color-muted-foreground)]">
                  Platform
                </dt>
                <dd className="text-sm font-medium text-[var(--color-foreground)]">
                  {streamer.primaryPlatform.charAt(0) +
                    streamer.primaryPlatform.slice(1).toLowerCase()}
                </dd>
              </div>
              {streamer.channelUrl && (
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    Channel
                  </dt>
                  <dd className="text-sm text-right min-w-0">
                    <a
                      href={streamer.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-brand)] hover:underline break-all"
                    >
                      {streamer.channelUrl
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                <dt className="text-sm text-[var(--color-muted-foreground)]">
                  Campaigns
                </dt>
                <dd className="text-sm font-medium text-[var(--color-foreground)]">
                  {streamer.campaignCount}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                <dt className="text-sm text-[var(--color-muted-foreground)]">
                  Avg Rating
                </dt>
                <dd className="flex items-center gap-1.5">
                  <StarRatingDisplay
                    value={Math.round(streamer.averageStreamerRating)}
                  />
                  <span className="text-sm font-medium text-[var(--color-foreground)]">
                    {formatRating(streamer.averageStreamerRating)}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-sm text-[var(--color-muted-foreground)]">
                  Member Since
                </dt>
                <dd className="text-sm font-medium text-[var(--color-foreground)]">
                  {new Date(streamer.memberSince).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </dd>
              </div>
            </dl>
          </Card>
        </aside>
      </div>
    </main>
  );
}
