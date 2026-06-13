import { Plus } from "lucide-react";
import { cn } from "@maingame/utils";

export function SeeAllGamesCard({ className }: { className?: string }) {
  return (
    <a
      href="/games"
      className={cn("group block", className)}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-brand)] group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200 group-hover:-translate-y-1 flex flex-col items-center justify-center gap-3">
        <Plus className="w-6 h-6 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors duration-200" />
        <p className="text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] font-medium text-sm transition-colors duration-200">
          See All Games
        </p>
      </div>
    </a>
  );
}
