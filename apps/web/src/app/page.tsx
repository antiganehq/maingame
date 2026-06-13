import { Hero12 } from "@/shared/components/hero-12";
import { LiveSection } from "@/shared/components/live-section";
import { GameSection } from "@/shared/components/game-section";
import { ScheduleSection } from "@/shared/components/schedule-section";
import { Carousel } from "@/shared/components/carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* <Hero12 /> */}
      <Carousel />
      <GameSection />
      <ScheduleSection />
      <LiveSection />
    </main>
  );
}
