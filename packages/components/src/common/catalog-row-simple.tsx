"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@maingame/utils";
import { CatalogCard, type CatalogCardItem } from "./catalog-card";

type SlugItem = { slug: string };

export type CatalogRowSimpleProps<T extends SlugItem = CatalogCardItem> =
  HTMLAttributes<HTMLDivElement> & {
    heading?: ReactNode;
    items: T[];
    renderItem?: (item: T) => ReactNode;
  };

export function CatalogRowSimple<T extends SlugItem = CatalogCardItem>({
  heading,
  items,
  renderItem,
  className,
  ...props
}: CatalogRowSimpleProps<T>) {
  if (items.length === 0) return null;

  return (
    <section
      className={cn("px-4 sm:px-6 lg:px-8 py-8", className)}
      {...props}
    >
      <div className="max-w-[1400px] mx-auto">
        {heading && <div className="mb-4">{heading}</div>}

        <div
          className="flex gap-3 sm:gap-4 overflow-x-auto p-2 -m-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            if (renderItem) {
              return (
                <div
                  key={item.slug}
                  className="flex-shrink-0 w-[calc((100%-2.25rem)/4)] sm:w-[calc((100%-4rem)/5)] md:w-[calc((100%-5rem)/6)] lg:w-[calc((100%-6rem)/7)]"
                >
                  {renderItem(item)}
                </div>
              );
            }
            return (
              <div
                key={item.slug}
                className="flex-shrink-0 w-[calc((100%-2.25rem)/4)] sm:w-[calc((100%-4rem)/5)] md:w-[calc((100%-5rem)/6)] lg:w-[calc((100%-6rem)/7)]"
              >
                <CatalogCard {...(item as unknown as CatalogCardItem)} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
