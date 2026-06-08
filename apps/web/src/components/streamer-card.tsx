import Image from "next/image";
import Link from "next/link";

type StreamerCardProps = {
  streamerName: string;
  streamerSlug: string;
  streamTitle: string;
  thumbnailUrl: string;
  profileUrl: string;
  viewerCount: number;
  gameName: string;
};

function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function StreamerCard({
  streamerName,
  streamerSlug,
  streamTitle,
  thumbnailUrl,
  profileUrl,
  viewerCount,
  gameName,
}: StreamerCardProps) {
  return (
    <Link
      href={`/streamers/${streamerSlug}`}
      className="group block rounded-xl overflow-hidden hover:ring-2 hover:ring-[var(--color-brand)] transition-all duration-200 hover:-translate-y-1"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={streamTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-section)]/60 to-transparent" />
        <span className="absolute top-2 left-2 bg-[var(--color-brand)] text-[var(--color-brand-foreground)] text-[10px] font-bold px-1.5 py-0.5 rounded">
          LIVE
        </span>
        <span className="absolute bottom-2 left-2 bg-[var(--color-overlay-strong)] text-[var(--color-card-foreground)] text-xs px-1.5 py-0.5 rounded">
          {formatViewers(viewerCount)} viewers
        </span>
      </div>
      <div className="p-3 flex gap-3 items-start">
        <div className="flex-shrink-0 rounded-full overflow-hidden ring-1 ring-[var(--color-border)] w-9 h-9">
          <Image
            src={profileUrl}
            alt={streamerName}
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-[var(--color-card-foreground)] font-medium text-sm leading-tight line-clamp-2">
            {streamTitle}
          </h3>
          <p className="text-[var(--color-muted)] text-xs mt-1 truncate">
            {streamerName}
          </p>
          <p className="text-[var(--color-muted-foreground)] text-xs truncate">{gameName}</p>
        </div>
      </div>
    </Link>
  );
}
