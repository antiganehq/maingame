"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@maingame/ui";
import { formatDots } from "@maingame/utils";

interface GameSidebarProps {
  coverImage: string | null;
  title: string;
  developer: {
    studioName: string;
    slug: string;
    bio: string | null;
    website: string | null;
  };
  genre: string | null;
  platforms: string[];
  status: string;
  statusLabel: string;
  budgetMinDots: number | null;
  budgetMaxDots: number | null;
  gameUrl: string | null;
  campaignObjective: string | null;
}

const statusBadgeVariant: Record<string, "success" | "secondary" | "warning" | "danger" | "default"> = {
  PUBLISHED: "success",
  DRAFT: "secondary",
  PAUSED: "warning",
  ARCHIVED: "secondary",
  REJECTED: "danger",
};

export function GameSidebar({
  coverImage,
  title,
  developer,
  genre,
  platforms,
  status,
  statusLabel,
  budgetMinDots,
  budgetMaxDots,
  gameUrl,
  campaignObjective,
}: GameSidebarProps) {
  const hasBudget = budgetMinDots != null || budgetMaxDots != null;

  return (
    <aside className="lg:sticky lg:top-24 space-y-5">
      {/* Capsule Image */}
      {coverImage && (
        <div className="relative w-full aspect-[460/215] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 350px"
            unoptimized
          />
        </div>
      )}

      {/* Status */}
      <div>
        <Badge variant={statusBadgeVariant[status] ?? "default"}>
          {statusLabel}
        </Badge>
      </div>

      {/* Developer */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-1">
          Developer
        </p>
        <Link
          href={`/streamers/${developer.slug}`}
          className="text-sm text-[var(--color-foreground)] hover:text-[var(--color-brand)] transition-colors"
        >
          {developer.studioName}
        </Link>
        {developer.bio && (
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1 leading-relaxed">
            {developer.bio}
          </p>
        )}
      </div>

      {/* Genre */}
      {genre && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-1">
            Genre
          </p>
          <Badge variant="secondary">{genre}</Badge>
        </div>
      )}

      {/* Platforms */}
      {platforms.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-1.5">
            Platforms
          </p>
          <div className="flex flex-wrap gap-1">
            {platforms.map((p) => (
              <Badge key={p} variant="secondary">
                {p}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Campaign Budget */}
      {hasBudget && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-1">
            Campaign Budget
          </p>
          <p className="text-sm font-semibold">
            {budgetMinDots != null ? formatDots(budgetMinDots) : "\u2014"}
            {" \u2014 "}
            {budgetMaxDots != null ? formatDots(budgetMaxDots) : "\u2014"}
            {" Dots"}
          </p>
        </div>
      )}

      {/* Links */}
      <div className="space-y-1.5">
        {developer.website && (
          <a
            href={developer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Visit Developer Website
          </a>
        )}
        {gameUrl && (
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Visit Game Page
          </a>
        )}
      </div>

      {/* CTA */}
      {gameUrl && (
        <a
          href={gameUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2.5 bg-[var(--color-brand)] text-[var(--color-brand-foreground)] font-semibold text-sm hover:bg-[var(--color-brand-hover)] transition-colors"
        >
          Visit Game
        </a>
      )}
    </aside>
  );
}
