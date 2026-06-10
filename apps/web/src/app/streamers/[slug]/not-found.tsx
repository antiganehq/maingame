import Link from "next/link";

export default function StreamerNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold text-[var(--color-foreground)]">
        Streamer not found
      </h1>
      <p className="text-sm text-[var(--color-muted-foreground)]">
        The streamer you&apos;re looking for doesn&apos;t exist or was removed.
      </p>
      <Link
        href="/streamers"
        className="text-sm font-medium text-[var(--color-brand)] hover:underline"
      >
        Browse Streamers
      </Link>
    </main>
  );
}
