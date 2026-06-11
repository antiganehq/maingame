"use client";

import { type HTMLAttributes, useState } from "react";
import { cn } from "@maingame/utils";
import { GameDetailPreview } from "./game-detail-preview";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface GameDetailSystemRequirement {
  platform: string;
  cpu: string;
  memory: string;
  gpu: string;
  storage: string;
}

export interface GameDetailPreviewItem {
  kind: "image" | "video";
  src: string;
}

export interface GameDetailDeveloper {
  studioName: string;
  slug: string;
  bio: string | null;
  website: string | null;
}

export interface GameDetailData {
  title: string;
  slug: string;
  description: string;
  genre: string | null;
  platforms: string[];
  tags: string[];
  screenshots: string[];
  trailerUrl: string | null;
  coverImage: string | null;
  horizontalCoverImage: string | null;
  gameUrl: string | null;
  websiteUrl: string | null;
  developer: GameDetailDeveloper;
  publisher: string;
  releaseDate: string;
  systemRequirements: GameDetailSystemRequirement[];
  previews: GameDetailPreviewItem[];
  status?: string;
}

/* ------------------------------------------------------------------ */
/*  Mock / Example Data                                                */
/* ------------------------------------------------------------------ */

export const GAME_EXAMPLE: GameDetailData = {
  title: "Wayward Warriors",
  slug: "wayward-warriors",
  description:
    "A fast-paced action RPG set in a mythical archipelago. Battle creatures from Indonesian legends and uncover ancient secrets hidden across floating islands.\n\nExplore vast temples, master elemental combat, and forge alliances with mythical spirits. Every island holds a new challenge — and a piece of a story that will reshape the world.",
  genre: "Action RPG",
  platforms: ["PC", "Mac", "Steam Deck"],
  tags: ["Action", "RPG", "Mythology", "Single-player", "Adventure", "Indie"],
  screenshots: [
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
  ],
  trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  coverImage:
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
  horizontalCoverImage:
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
  gameUrl: "https://store.steampowered.com/app/waywardwarriors",
  websiteUrl: "https://waywardwarriors.game",
  developer: {
    studioName: "Nusantara Games",
    slug: "nusantara-games",
    bio: "Indie studio from Jakarta building games inspired by Southeast Asian folklore. Small team, big stories.",
    website: "https://nusantaragames.id",
  },
  publisher: "Nusantara Games",
  releaseDate: "2026-03-15",
  status: "PUBLISHED",
  previews: [
    {
      kind: "image",
      src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    },
    {
      kind: "image",
      src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80",
    },
    {
      kind: "image",
      src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    },
    {
      kind: "image",
      src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
    },
    {
      kind: "image",
      src: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1200&q=80",
    },
  ],
  systemRequirements: [
    {
      platform: "Windows",
      cpu: "Intel Core i5-8400 / AMD Ryzen 5 2600",
      memory: "8 GB",
      gpu: "NVIDIA GTX 1060 / AMD RX 580",
      storage: "25 GB",
    },
    {
      platform: "macOS",
      cpu: "Apple M1 or Intel Core i5 (2019+)",
      memory: "8 GB",
      gpu: "Apple M1 GPU / AMD Radeon Pro 5500M",
      storage: "25 GB",
    },
    {
      platform: "Steam Deck",
      cpu: "AMD Zen 2 (Steam Deck)",
      memory: "16 GB",
      gpu: "AMD RDNA 2 (Steam Deck)",
      storage: "25 GB",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Platform icon helpers (inline SVGs)                                */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  PC: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  Mac: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      <path d="M12 5v.01" />
    </svg>
  ),
  macOS: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      <path d="M12 5v.01" />
    </svg>
  ),
  Linux: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
      <path d="M8.5 8.5a3.5 3.5 0 017 0" />
    </svg>
  ),
  "Steam Deck": (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 11h12a4 4 0 014 4v.5a3.5 3.5 0 01-7 0V15H9v.5a3.5 3.5 0 01-7 0V15a4 4 0 014-4z" />
      <circle cx="7.5" cy="12.5" r="1.5" />
      <circle cx="16.5" cy="12.5" r="1.5" />
    </svg>
  ),
};

function platformIcon(label: string): React.ReactNode {
  for (const key of Object.keys(PLATFORM_ICONS)) {
    if (label.toLowerCase().includes(key.toLowerCase())) {
      return PLATFORM_ICONS[key];
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  GameDetail (main wrapper)                                          */
/* ------------------------------------------------------------------ */

export function GameDetail({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col gap-8 pb-4 text-[var(--color-foreground)] duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GameDetailHero                                                     */
/* ------------------------------------------------------------------ */

export type GameDetailHeroProps = HTMLAttributes<HTMLDivElement> & {
  coverImage: string | null;
  title: string;
  developer: GameDetailDeveloper;
  tags: string[];
  status?: string;
};

export function GameDetailHero({
  coverImage,
  title,
  developer,
  tags,
  status,
  className,
  ...props
}: GameDetailHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[30rem] w-full max-h-[50rem] overflow-hidden bg-[var(--color-section)] text-[var(--color-section-foreground)]",
        className,
      )}
      {...props}
    >
      {coverImage ? (
        <img
          src={coverImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-[var(--color-section)] motion-reduce:animate-none" />
      )}

      <div className="relative z-5 mx-auto flex min-h-[30rem] w-full max-w-[1480px] flex-col justify-end gap-6 px-6 py-8 sm:px-8 md:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 md:w-3/5">
          {tags.length > 0 && (
            <p className="tracking-wide text-[var(--color-section-foreground)] capitalize">
              {tags.join(" - ")}
            </p>
          )}
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="sr-only">
            Developed by {developer.studioName}
            {status ? `. Status: ${status}.` : "."}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GameDetailGlance — ported from PeridotVault GameGlance              */
/* ------------------------------------------------------------------ */

export type GameDetailGlanceProps = HTMLAttributes<HTMLDivElement> & {
  previews: GameDetailPreviewItem[];
  horizontalCoverImage: string | null;
  title: string;
  description: string;
  tags: string[];
};

export function GameDetailGlance({
  previews: rawPreviews,
  horizontalCoverImage,
  title,
  description,
  tags: rawTags,
  className,
  ...props
}: GameDetailGlanceProps) {
  const safePreviews = rawPreviews ?? [];
  const safeTags = rawTags ?? [];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1480px] gap-12 px-6 sm:px-8 md:px-12 max-lg:flex-col",
        className,
      )}
      {...props}
    >
      <div className="flex w-full overflow-hidden">
        <GameDetailPreview
          items={
            safePreviews.length
              ? safePreviews
              : horizontalCoverImage
                ? [{ kind: "image" as const, src: horizontalCoverImage }]
                : []
          }
        />
      </div>

      <dl className="relative flex w-full shrink-0 flex-col justify-between gap-6 pb-6 lg:max-w-[400px]">
        <div className="flex flex-col gap-6">
          {horizontalCoverImage ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={horizontalCoverImage}
                alt={`Cover game ${title}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full animate-pulse bg-[var(--color-surface)] motion-reduce:animate-none" />
          )}
          <div className="pr-6">
            <dt className="sr-only">Game Description</dt>
            <dd className="whitespace-pre-line leading-relaxed">
              {description}
            </dd>
          </div>
        </div>

        <div className="pr-6">
          <div className="flex flex-col gap-3">
            <dt className="text-[var(--color-muted-foreground)]">Tags</dt>
            <dd className="flex flex-wrap gap-3">
              {safeTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[var(--color-border-light)] px-2 py-1 capitalize"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GameDetailMediaStrip (horizontal scroll strip, kept as option)     */
/* ------------------------------------------------------------------ */

export type GameDetailMediaStripProps = HTMLAttributes<HTMLDivElement> & {
  screenshots: string[];
  trailerUrl: string | null;
  title: string;
};

function parseTrailerEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    if (hostname === "youtube.com" || hostname === "youtu.be") {
      let videoId: string | null = null;
      if (hostname === "youtu.be") {
        videoId = parsed.pathname.slice(1);
      } else if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      }
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    if (hostname === "vimeo.com") {
      const match = parsed.pathname.match(/^\/(\d+)/);
      if (match) return `https://player.vimeo.com/video/${match[1]}`;
    }
  } catch {
    // Invalid URL
  }
  return null;
}

export function GameDetailMediaStrip({
  screenshots,
  trailerUrl,
  title,
  className,
  ...props
}: GameDetailMediaStripProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const totalItems = screenshots.length + (trailerUrl ? 1 : 0);
  if (totalItems === 0) return null;

  const close = () => {
    setLightboxIndex(null);
    setShowTrailer(false);
  };

  const goNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % screenshots.length;
    });
  };

  const goPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + screenshots.length) % screenshots.length;
    });
  };

  return (
    <>
      <div
        className={cn(
          "bg-[var(--color-section)] border-b border-[var(--color-border-light)]",
          className,
        )}
        {...props}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] mb-3">
            Screenshots &amp; Videos
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {trailerUrl && (
              <button
                onClick={() => setShowTrailer(true)}
                className="relative flex-shrink-0 w-[324px] h-[182px] overflow-hidden group/thumb focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
              >
                <div className="absolute inset-0 bg-[var(--color-surface)] flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    className="text-[var(--color-muted-foreground)] group-hover/thumb:text-[var(--color-brand)] transition-colors"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <polygon points="19,14 35,24 19,34" fill="currentColor" />
                  </svg>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5">
                  WATCH TRAILER
                </div>
                <div className="absolute inset-0 ring-2 ring-transparent group-hover/thumb:ring-[var(--color-brand)] transition-all" />
              </button>
            )}

            {screenshots.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative flex-shrink-0 w-[324px] h-[182px] overflow-hidden group/thumb focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
              >
                <img
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 ring-2 ring-transparent group-hover/thumb:ring-[var(--color-brand)] transition-all" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5">
                  {i + 1} of {screenshots.length}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const embedUrl = parseTrailerEmbedUrl(trailerUrl);
              if (embedUrl) {
                return (
                  <iframe
                    src={embedUrl}
                    title={`${title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                );
              }
              return (
                <div className="absolute inset-0 bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-muted-foreground)]">
                  Unable to load trailer.
                </div>
              );
            })()}
            <button
              onClick={close}
              className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center text-white hover:text-[var(--color-brand)] transition-colors"
              aria-label="Close trailer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Screenshot Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={screenshots[lightboxIndex]}
              alt={`${title} screenshot ${lightboxIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Previous screenshot"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Next screenshot"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <button
              onClick={close}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close gallery"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1">
              {lightboxIndex + 1} / {screenshots.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  GameDetailContent (two-column layout)                               */
/* ------------------------------------------------------------------ */

export function GameDetailContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1480px] gap-12 px-6 sm:px-8 md:px-12 max-lg:flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GameDetailSidebar                                                  */
/* ------------------------------------------------------------------ */

export type GameDetailSidebarProps = HTMLAttributes<HTMLDivElement> & {
  genre: string | null;
  platforms: string[];
  developer: GameDetailDeveloper;
  publisher: string;
  releaseDate: string;
  websiteUrl: string | null;
  gameUrl: string | null;
};

export function GameDetailSidebar({
  genre,
  platforms,
  developer,
  publisher,
  releaseDate,
  websiteUrl,
  gameUrl,
  className,
  ...props
}: GameDetailSidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-full shrink-0 flex-col gap-4 lg:max-w-[400px]",
        className,
      )}
      {...props}
    >
      {gameUrl && (
        <div className="flex flex-col gap-4 border border-[var(--color-border-light)] p-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-[var(--color-muted-foreground)]">
              Available from
            </span>
            <span className="text-xl font-medium">{developer.studioName}</span>
          </div>
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 w-full items-center justify-center bg-[var(--color-brand)] px-5 text-lg font-medium text-[var(--color-brand-foreground)] transition-colors duration-300 hover:bg-[var(--color-brand-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            Visit Game Page
          </a>
        </div>
      )}

      <dl className="mb-4">
        {genre && (
          <div className="flex w-full items-center justify-between border-b border-[var(--color-border-light)] py-3">
            <dt className="text-[var(--color-muted-foreground)]">Genre</dt>
            <dd>{genre}</dd>
          </div>
        )}
        {platforms.length > 0 && (
          <div className="flex w-full items-center justify-between border-b border-[var(--color-border-light)] py-3">
            <dt className="text-[var(--color-muted-foreground)]">Platform</dt>
            <dd className="flex flex-wrap justify-end gap-2 text-lg">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-1.5"
                  title={platform}
                >
                  {platformIcon(platform)}
                  <span className="text-sm">{platform}</span>
                </span>
              ))}
            </dd>
          </div>
        )}
        <div className="flex w-full justify-between gap-6 border-b border-[var(--color-border-light)] py-3">
          <dt className="text-[var(--color-muted-foreground)]">Developer</dt>
          <dd className="text-right">{developer.studioName}</dd>
        </div>
        <div className="flex w-full justify-between gap-6 border-b border-[var(--color-border-light)] py-3">
          <dt className="text-[var(--color-muted-foreground)]">Publisher</dt>
          <dd className="text-right">{publisher}</dd>
        </div>
        <div className="flex w-full justify-between gap-6 border-b border-[var(--color-border-light)] py-3">
          <dt className="text-[var(--color-muted-foreground)]">Release Date</dt>
          <dd className="text-right">
            {new Date(releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </dd>
        </div>
        {websiteUrl && (
          <div className="flex w-full justify-between gap-6 border-b border-[var(--color-border-light)] py-3">
            <dt className="text-[var(--color-muted-foreground)]">Website</dt>
            <dd className="min-w-0 text-right">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[var(--color-brand)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
              >
                {websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  GameDetailSystemRequirements                                        */
/* ------------------------------------------------------------------ */

export type GameDetailSystemRequirementsProps =
  HTMLAttributes<HTMLDivElement> & {
    requirements: GameDetailSystemRequirement[];
  };

export function GameDetailSystemRequirements({
  requirements,
  className,
  ...props
}: GameDetailSystemRequirementsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (requirements.length === 0) return null;

  const current = requirements[activeTab] ?? requirements[0];

  const specs = [
    { title: "OS", description: current.platform },
    { title: "CPU", description: current.cpu },
    { title: "Memory", description: current.memory },
    { title: "GPU", description: current.gpu },
    { title: "Storage", description: current.storage },
  ];

  return (
    <section className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <h2 className="text-2xl font-medium leading-relaxed">
        System Requirements
      </h2>

      {requirements.length > 1 && (
        <div
          className="flex flex-wrap gap-1"
          role="tablist"
          aria-label="System requirement platform"
        >
          {requirements.map((req, idx) => (
            <button
              key={req.platform}
              type="button"
              onClick={() => setActiveTab(idx)}
              role="tab"
              aria-selected={idx === activeTab}
              className={cn(
                "flex min-h-10 items-center gap-1.5 border px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                idx === activeTab
                  ? "border-[var(--color-brand)] text-[var(--color-foreground)]"
                  : "border-transparent text-[var(--color-muted-foreground)] hover:border-[var(--color-border-light)] hover:text-[var(--color-foreground)]",
              )}
            >
              {platformIcon(req.platform)}
              {req.platform}
            </button>
          ))}
        </div>
      )}

      <div className="border border-[var(--color-border-light)] p-6 sm:p-10">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {specs.map(({ title, description }) => (
            <div key={title} className="flex flex-col gap-1">
              <dt className="text-[var(--color-muted-foreground)]">{title}</dt>
              <dd className="text-xl text-[var(--color-foreground)]">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
