import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
  title: string;
  slug: string;
  coverImage: string;
  streamerCount: number;
};

export function GameCard({ title, slug, coverImage, streamerCount }: GameCardProps) {
  return (
    <Link
      href={`/games/${slug}`}
      className="group block"
    >
      <div className="aspect-[3/4] relative overflow-hidden group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200 group-hover:-translate-y-1">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="pt-2">
        <h3 className="text-[var(--color-foreground)] font-semibold text-sm leading-tight truncate">
          {title}
        </h3>
        <p className="text-[var(--color-muted-foreground)] text-xs mt-0.5">
          {streamerCount} {streamerCount === 1 ? "streamer" : "streamers"}
        </p>
      </div>
    </Link>
  );
}
