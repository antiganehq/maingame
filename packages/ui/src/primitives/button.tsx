import type { ButtonHTMLAttributes } from "react";
import { cn } from "@maingame/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-zinc-950 text-white hover:bg-zinc-800",
  secondary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200",
  ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100"
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
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      type={type}
      {...props}
    />
  );
}
