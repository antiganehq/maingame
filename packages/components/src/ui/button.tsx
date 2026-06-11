import type { ButtonHTMLAttributes } from "react";
import { cn } from "@maingame/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-80",
  secondary:
    "border border-[var(--color-border-light)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-hover)]",
  ghost:
    "bg-transparent text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)]",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      type={type}
      {...props}
    />
  );
}
