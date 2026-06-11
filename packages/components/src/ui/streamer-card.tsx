import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@maingame/utils";
import { StreamPlatform } from "@maingame/types";

const PLATFORM_ICONS: Record<string, ReactNode> = {
  [StreamPlatform.Twitch]: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  ),
  [StreamPlatform.YouTube]: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  [StreamPlatform.Kick]: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 11.5l-3 3-3-3-3 3-3-3 3-3-3-3 3-3 3 3 3-3 3 3-3 3z" />
    </svg>
  ),
  DEFAULT: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l4-4 4 4M12 8v8" />
    </svg>
  ),
};

function platformIcon(platform: StreamPlatform): ReactNode {
  return PLATFORM_ICONS[platform] ?? PLATFORM_ICONS.DEFAULT;
}

const PLATFORM_LABEL: Record<string, string> = {
  [StreamPlatform.Twitch]: "Twitch",
  [StreamPlatform.YouTube]: "YouTube",
  [StreamPlatform.Kick]: "Kick",
};

export type StreamerCardProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  primaryPlatform: StreamPlatform;
  meta?: ReactNode;
  badge?: ReactNode;
  href?: string;
};

export function StreamerCard({
  displayName,
  slug,
  avatarUrl,
  primaryPlatform,
  meta,
  badge,
  href,
  className,
  ...props
}: StreamerCardProps) {
  return (
    <a
      href={href ?? `/streamers/${slug}`}
      className={cn("group block", className)}
      {...props}
    >
      <div className="aspect-[16/9] relative overflow-hidden group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200 group-hover:-translate-y-1">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-brand)] text-xl font-bold text-[var(--color-brand-foreground)]">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        {badge && (
          <div className="absolute left-2 top-2 z-5">{badge}</div>
        )}
      </div>
      <div className="pt-2">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)] mb-0.5">
          {platformIcon(primaryPlatform)}
          <span>{PLATFORM_LABEL[primaryPlatform] ?? primaryPlatform}</span>
        </div>
        <h3 className="text-[var(--color-foreground)] font-semibold text-sm leading-tight truncate">
          {displayName}
        </h3>
        {meta && (
          <div className="text-[var(--color-muted-foreground)] text-xs mt-0.5">
            {meta}
          </div>
        )}
      </div>
    </a>
  );
}
