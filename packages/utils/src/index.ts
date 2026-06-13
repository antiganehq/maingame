export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDots(amount: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(amount);
}

export { useBreakpoint } from "./hooks/use-breakpoint";
export type { Breakpoint } from "./hooks/use-breakpoint";
