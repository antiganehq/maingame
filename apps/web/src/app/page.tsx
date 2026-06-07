import { Hero12 } from "@/components/hero-12";
import { GameSection } from "@/components/game-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <Hero12 />
      <GameSection />
    </main>
  );
}
