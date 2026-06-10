import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-sm font-medium text-[var(--color-muted-foreground)] uppercase tracking-wide">
          404
        </p>
        <h1 className="text-2xl font-bold mt-2">Game not found</h1>
        <p className="text-[var(--color-muted-foreground)] mt-2 max-w-md">
          The game you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2.5 bg-[var(--color-brand)] text-[var(--color-brand-foreground)] font-medium hover:bg-[var(--color-brand-hover)] transition-colors"
        >
          Browse Games
        </Link>
      </div>
    </main>
  );
}
