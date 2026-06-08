import { Hero12 } from "@/components/hero-12";
import { LiveSection } from "@/components/live-section";
import { GameSection } from "@/components/game-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* <Hero12 /> */}
      <GameSection />
      <LiveSection />
    </main>
  );
}
