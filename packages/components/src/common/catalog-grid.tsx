import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@maingame/utils";
import { CatalogCard, type CatalogCardItem } from "./catalog-card";

type SlugItem = { slug: string };

export type CatalogGridProps<T extends SlugItem = CatalogCardItem> =
  HTMLAttributes<HTMLDivElement> & {
    items: T[];
    renderItem?: (item: T) => ReactNode;
  };

export function CatalogGrid<T extends SlugItem = CatalogCardItem>({
  items,
  renderItem,
  className,
  ...props
}: CatalogGridProps<T>) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
        className,
      )}
      {...props}
    >
      {items.map((item) =>
        renderItem ? (
          <div key={item.slug}>{renderItem(item)}</div>
        ) : (
          <CatalogCard key={item.slug} {...(item as unknown as CatalogCardItem)} />
        ),
      )}
    </div>
  );
}
