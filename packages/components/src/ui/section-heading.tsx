import type { HTMLAttributes } from "react";
import { cn } from "@maingame/utils";

export type SectionHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  text1: string;
  text2: string;
};

export function SectionHeading({
  text1,
  text2,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-[var(--color-foreground)] text-2xl sm:text-xl",
        className,
      )}
      {...props}
    >
      <span className="text-[var(--color-brand)] font-display">{text1} </span>
      <span>{text2}</span>
    </h2>
  );
}
