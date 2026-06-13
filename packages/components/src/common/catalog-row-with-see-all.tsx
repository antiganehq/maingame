"use client";

import type { ReactNode } from "react";
import { useBreakpoint } from "@maingame/utils";
import { CatalogRowSimple, type CatalogRowSimpleProps } from "./catalog-row-simple";

type SlugItem = { slug: string };

const SEE_ALL_SLUG = "__see-all__";

export type CatalogRowWithSeeAllProps<T extends SlugItem> = Omit<
  CatalogRowSimpleProps<T>,
  "items"
> & {
  items: T[];
  seeAllCard: ReactNode;
};

const MAX_ITEMS_BY_BREAKPOINT = {
  mobile: 3,
  sm: 4,
  md: 5,
  lg: 6,
} as const;

export function CatalogRowWithSeeAll<T extends SlugItem>({
  items,
  seeAllCard,
  renderItem,
  ...props
}: CatalogRowWithSeeAllProps<T>) {
  const breakpoint = useBreakpoint();
  const maxItems = MAX_ITEMS_BY_BREAKPOINT[breakpoint];
  const limitedItems = items.slice(0, maxItems);
  const seeAllItem = { slug: SEE_ALL_SLUG } as T;
  const itemsWithSeeAll = [...limitedItems, seeAllItem];

  return (
    <CatalogRowSimple
      {...props}
      items={itemsWithSeeAll}
      renderItem={(item) => {
        if (item.slug === SEE_ALL_SLUG) {
          return seeAllCard;
        }
        return renderItem?.(item) ?? null;
      }}
    />
  );
}
