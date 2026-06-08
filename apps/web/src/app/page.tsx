import { Hero12 } from "@/components/hero-12";
import { LiveSection } from "@/components/live-section";
import { GameSection } from "@/components/game-section";
import { Carousel } from "@/components/carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* <Hero12 /> */}
      <Carousel />
      <GameSection />
      <LiveSection />
    </main>
  );
}
