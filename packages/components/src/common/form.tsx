import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@maingame/utils";

export function FormField({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

export function FormLabel({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-zinc-700", className)}
      {...props}
    >
      {children}
    </label>
  );
}

export function FormMessage({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-red-600", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function FormDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-zinc-500", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function FormError({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FormSuccess({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
