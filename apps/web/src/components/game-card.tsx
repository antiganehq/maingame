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
      className="group block rounded-lg overflow-hidden bg-neutral-900 hover:ring-2 hover:ring-[var(--brand)] transition-all duration-200 hover:-translate-y-1"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-sm leading-tight truncate">
            {title}
          </h3>
          <p className="text-emerald-400 text-xs mt-0.5">
            {streamerCount} {streamerCount === 1 ? "streamer" : "streamers"}
          </p>
        </div>
      </div>
    </Link>
  );
}
