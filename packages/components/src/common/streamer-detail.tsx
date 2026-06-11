import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@maingame/utils";
import { StreamPlatform } from "@maingame/types";

const PLATFORM_LABEL: Record<string, string> = {
  [StreamPlatform.Twitch]: "Twitch",
  [StreamPlatform.YouTube]: "YouTube",
  [StreamPlatform.Kick]: "Kick",
};

const PLATFORM_ICON: Record<string, ReactNode> = {
  [StreamPlatform.Twitch]: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  ),
  [StreamPlatform.YouTube]: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  [StreamPlatform.Kick]: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 11.5l-3 3-3-3-3 3-3-3 3-3-3-3 3-3 3 3 3-3 3 3-3 3z" />
    </svg>
  ),
};

function platformIcon(platform: StreamPlatform): ReactNode {
  return PLATFORM_ICON[platform] ?? null;
}

export function StreamerDetailHero({
  bannerUrl,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { bannerUrl?: string | null }) {
  return (
    <section
      className={cn(
        "mx-auto max-w-[1400px] bg-[var(--color-section)] text-[var(--color-section-foreground)] h-40 md:h-52 relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
      )}
    </section>
  );
}

export type StreamerDetailProfileProps = HTMLAttributes<HTMLDivElement> & {
  displayName: string;
  primaryPlatform: StreamPlatform;
  channelUrl: string | null;
  avatarUrl: string | null;
  meta?: ReactNode;
  stats?: { label: string; value: string }[];
  action?: ReactNode;
};

export function StreamerDetailProfile({
  displayName,
  primaryPlatform,
  channelUrl,
  avatarUrl,
  meta,
  stats,
  action,
  className,
  ...props
}: StreamerDetailProfileProps) {
  const label = PLATFORM_LABEL[primaryPlatform] ?? primaryPlatform;

  return (
    <div className={className} {...props}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-end gap-5">
          <div className="h-28 w-28 sm:h-40 sm:w-40 shrink-0 overflow-hidden ring-4 ring-[var(--color-background)] bg-[var(--color-brand)] flex items-center justify-center text-2xl font-bold text-[var(--color-brand-foreground)]">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              displayName.charAt(0).toUpperCase()
            )}
          </div>

          <div className="flex flex-col gap-4 items-start">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl text-[var(--color-foreground)]">
              {displayName}
            </h1>

            {meta && (
              <p className="text-sm text-[var(--color-muted-foreground)] -mt-2">
                {meta}
              </p>
            )}

            {stats && stats.length > 0 && (
              <div className="flex items-center gap-3 text-sm -mt-2">
                {stats.map((stat, i) => (
                  <span key={stat.label} className="flex items-center gap-1">
                    <span className="font-semibold text-[var(--color-foreground)]">
                      {stat.value}
                    </span>
                    <span className="text-[var(--color-muted-foreground)]">
                      {stat.label}
                    </span>
                    {i < stats.length - 1 && (
                      <span className="text-[var(--color-border-light)] ml-2">
                        |
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {action ??
              (channelUrl ? (
                <Link
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 bg-[var(--color-section)] px-5 text-sm font-medium text-[var(--color-section-foreground)] transition-colors hover:opacity-80"
                >
                  {platformIcon(primaryPlatform)}
                  Watch on {label}
                </Link>
              ) : null)}
          </div>
        </div>
      </div>
    </div>
  );
}
