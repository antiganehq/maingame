import type { HTMLAttributes, ReactNode } from "react";
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

export type StreamerDetailHeroProps = HTMLAttributes<HTMLDivElement> & {
  displayName: string;
  primaryPlatform: StreamPlatform;
  channelUrl: string | null;
  avatarUrl: string | null;
  meta?: ReactNode;
  action?: ReactNode;
};

export function StreamerDetailHero({
  displayName,
  primaryPlatform,
  channelUrl,
  avatarUrl,
  meta,
  action,
  className,
  ...props
}: StreamerDetailHeroProps) {
  const label = PLATFORM_LABEL[primaryPlatform] ?? primaryPlatform;

  return (
    <section
      className={cn(
        "relative w-full bg-[var(--color-section)] text-[var(--color-section-foreground)]",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-6 py-10 sm:px-8 md:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-section-foreground)]/20">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--color-brand)] text-2xl font-bold text-[var(--color-brand-foreground)]">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              {platformIcon(primaryPlatform)}
              <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                {label}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {displayName}
            </h1>

            {meta && (
              <p className="text-sm text-[var(--color-muted-foreground)]">
                {meta}
              </p>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          {action ?? (
            channelUrl ? (
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-[var(--color-brand)] px-5 text-sm font-medium text-[var(--color-brand-foreground)] transition-colors hover:bg-[var(--color-brand-hover)] no-underline"
              >
                {platformIcon(primaryPlatform)}
                Watch on {label}
              </a>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
