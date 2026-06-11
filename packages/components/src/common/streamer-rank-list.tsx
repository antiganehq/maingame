import Link from "next/link";
import type { HTMLAttributes } from "react";
import { cn } from "@maingame/utils";

export type StreamerRankItem = {
  rank: number;
  displayName: string;
  slug: string;
  avatarUrl: string | null;
};

export type StreamerRankListProps = HTMLAttributes<HTMLDivElement> & {
  streamers: StreamerRankItem[];
};

export function StreamerRankList({
  streamers,
  className,
  ...props
}: StreamerRankListProps) {
  if (streamers.length === 0) return null;

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {streamers.map((s) => (
        <Link
          key={s.slug}
          href={`/streamers/${s.slug}`}
          className="flex items-center gap-3 py-2 group"
        >
          <span className="w-7 text-sm font-display text-[var(--color-muted-foreground)] ">
            #{s.rank}
          </span>

          <div className="h-8 w-8 shrink-0 overflow-hidden bg-[var(--color-brand)] flex items-center justify-center text-xs font-semibold text-[var(--color-brand-foreground)]">
            {s.avatarUrl ? (
              <img
                src={s.avatarUrl}
                alt={s.displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              s.displayName.charAt(0).toUpperCase()
            )}
          </div>

          <span className="text-sm font-medium text-[var(--color-foreground)] truncate group-hover:text-[var(--color-brand)] transition-colors">
            {s.displayName}
          </span>
        </Link>
      ))}
    </div>
  );
}
