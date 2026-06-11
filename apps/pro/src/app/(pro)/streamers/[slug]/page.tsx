import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  StreamerDetailHero,
  StreamerDetailProfile,
  SectionHeading,
  StarRatingDisplay,
  Button,
} from "@maingame/components";
import { getStreamer } from "@maingame/db";
import { StreamerDetailContent } from "./streamer-content";

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

export default async function ProStreamerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const streamer = getStreamer(slug);
  if (!streamer) notFound();

  return (
    <main className="min-h-screen text-[var(--color-foreground)] px-6">
      <StreamerDetailHero />

      <div className="mx-auto max-w-[1400px] w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 py-6 lg:py-8">
            <StreamerDetailProfile
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
              action={
                <Button>
                  <Link
                    href={`/campaigns/new?streamer=${streamer.slug}`}
                    className="no-underline text-inherit"
                  >
                    Send Campaign Offer
                  </Link>
                </Button>
              }
            />
            <StreamerDetailContent streamer={streamer} />
          </div>

          <aside className="w-full lg:w-80 shrink-0 py-6 lg:py-8 flex flex-col gap-6">
            <SectionHeading text1="Channel" text2="Statistics" />
            <div>
              <dl className="space-y-3">
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
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    Total Campaign
                  </dt>
                  <dd className="text-sm font-medium text-[var(--color-foreground)]">
                    {streamer.campaignCount}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    Member Since
                  </dt>
                  <dd className="text-sm font-medium text-[var(--color-foreground)]">
                    {new Date(streamer.memberSince).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                      },
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    Gender
                  </dt>
                  <dd className="text-sm font-medium text-[var(--color-foreground)]">
                    {streamer.gender ?? "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    Language
                  </dt>
                  <dd className="text-sm font-medium text-[var(--color-foreground)]">
                    {streamer.language ?? "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    Birth Date
                  </dt>
                  <dd className="text-sm font-medium text-[var(--color-foreground)]">
                    {new Date(streamer.birthDate ?? "").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <SectionHeading text1="Stream" text2="Platforms" />
              <dl className="mt-3 space-y-3">
                <div className="flex justify-between gap-4 border-b border-[var(--color-border-light)] pb-3">
                  <dt className="text-sm text-[var(--color-muted-foreground)]">
                    {streamer.primaryPlatform.charAt(0) + streamer.primaryPlatform.slice(1).toLowerCase()}
                  </dt>
                  <dd className="text-sm text-right min-w-0">
                    <a
                      href={streamer.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-brand)] hover:underline break-all"
                    >
                      {streamer.channelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <SectionHeading text1="About" text2="Me" />
              <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                {streamer.bio}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
