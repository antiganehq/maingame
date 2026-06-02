import Link from "next/link";
import { appName, brandCopy, publicNavigation, tagline, urls } from "@maingame/brand";
import { Button, Card, CardDescription, CardTitle } from "@maingame/ui";
import { StreamPlatform, type PublicGame } from "@maingame/types";

const featuredGame: PublicGame = {
  id: "placeholder-game",
  title: "Neon Siege",
  slug: "neon-siege",
  studioName: "Example Studio",
  shortDescription: "A placeholder game listing for the public marketplace shell."
};

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link className="text-lg font-semibold tracking-tight" href="/">
          {appName}
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex">
          {publicNavigation.map((item) => (
            <Link className="hover:text-zinc-950" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
          href={urls.localPro}
        >
          Pro
        </a>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            {tagline}
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950">
            {brandCopy.publicHeroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            {brandCopy.publicHeroBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Browse games</Button>
            <Button variant="secondary">See streams today</Button>
          </div>
        </div>

        <Card>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Featured placeholder
          </p>
          <CardTitle className="mt-4">{featuredGame.title}</CardTitle>
          <CardDescription>{featuredGame.shortDescription}</CardDescription>
          <div className="mt-6 rounded-md bg-zinc-100 p-4 text-sm text-zinc-700">
            <p>Studio: {featuredGame.studioName}</p>
            <p>Streamer platform: {StreamPlatform.Twitch}</p>
          </div>
        </Card>
      </section>
    </main>
  );
}
