import type { AnchorHTMLAttributes } from "react";
import { cn } from "@maingame/utils";

export type GameCardProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  title: string;
  slug: string;
  coverImage: string | null;
  streamerCount: number;
  href?: string;
};

export function GameCard({
  title,
  slug,
  coverImage,
  streamerCount,
  href,
  className,
  ...props
}: GameCardProps) {
  return (
    <a
      href={href ?? `/games/${slug}`}
      className={cn("group block", className)}
      {...props}
    >
      <div className="aspect-[3/4] relative overflow-hidden group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200 group-hover:-translate-y-1">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)] text-sm text-[var(--color-muted-foreground)]">
            No cover
          </div>
        )}
      </div>
      <div className="pt-2">
        <h3 className="text-[var(--color-foreground)] font-semibold text-sm leading-tight truncate">
          {title}
        </h3>
        <p className="text-[var(--color-muted-foreground)] text-xs mt-0.5">
          {streamerCount} {streamerCount === 1 ? "streamer" : "streamers"}
        </p>
      </div>
    </a>
  );
}
