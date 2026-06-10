import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@maingame/utils";

export type CatalogCardItem = {
  title: string;
  slug: string;
  coverImage: string | null;
  meta?: ReactNode;
  badge?: ReactNode;
  href?: string;
};

export type CatalogCardProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  CatalogCardItem;

export function CatalogCard({
  title,
  slug,
  coverImage,
  meta,
  badge,
  href,
  className,
  ...props
}: CatalogCardProps) {
  return (
    <Link
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
        {badge && (
          <div className="absolute left-2 top-2 z-5">{badge}</div>
        )}
      </div>
      <div className="pt-2">
        <h3 className="text-[var(--color-foreground)] font-semibold text-sm leading-tight truncate">
          {title}
        </h3>
        {meta && (
          <div className="text-[var(--color-muted-foreground)] text-xs mt-0.5">
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}
