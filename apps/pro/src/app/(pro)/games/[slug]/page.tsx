import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  GameDetail,
  GameDetailHero,
  GameDetailGlance,
  GameDetailContent,
  GameDetailSidebar,
  type GameDetailData,
  SectionHeading,
  CommentsSection,
} from "@maingame/components";
import { getGame } from "@maingame/db";
import type { GameData } from "@maingame/db";

function mapToGameDetailData(game: GameData): GameDetailData {
  return {
    title: game.title,
    slug: game.slug,
    description: game.description,
    genre: game.genre,
    platforms: game.platforms,
    tags: game.tags,
    screenshots: game.screenshots,
    trailerUrl: game.trailerUrl,
    coverImage: game.coverImage,
    horizontalCoverImage: game.horizontalCoverImage,
    gameUrl: game.gameUrl,
    websiteUrl: game.websiteUrl,
    developer: {
      studioName: game.developer.studioName,
      slug: game.developer.slug,
      bio: game.developer.bio,
      website: game.developer.website,
    },
    publisher: game.publisher,
    releaseDate: game.releaseDate,
    systemRequirements: [],
    previews: game.previews,
    status: game.status,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);

  if (!game) {
    return { title: "Game not found — maingame.fun" };
  }

  return {
    title: `${game.title} — maingame.fun`,
    description: game.description.slice(0, 160),
  };
}

export default async function ProGameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const d = mapToGameDetailData(game);

  return (
    <main className="min-h-screen text-zinc-950">
      <GameDetail>
        <GameDetailHero
          coverImage={d.coverImage}
          title={d.title}
          developer={d.developer}
          tags={d.tags}
          status={d.status}
        />

        <GameDetailGlance
          previews={d.previews}
          horizontalCoverImage={d.horizontalCoverImage}
          title={d.title}
          description={d.description}
          tags={d.tags}
        />

        <GameDetailContent>
          <div className="lg:flex-1 lg:min-w-0 space-y-8">
            <section className="flex flex-col gap-4">
              <SectionHeading text1="About" text2="This Game" />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
                officia, iusto modi minima veritatis porro, ipsum similique iure
                asperiores praesentium numquam eius! Perferendis ipsam dolore
                assumenda quo pariatur magnam quisquam! Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Blanditiis repellat eveniet,
                necessitatibus recusandae adipisci, facere illum dolor
                accusantium, perferendis ducimus placeat iure atque debitis
                consequuntur consequatur ratione harum et alias sint!
                Perspiciatis, in officia rerum non harum velit possimus, itaque
                laborum reiciendis nobis dicta praesentium quidem molestias
                dolore odit enim optio. Quo iste quisquam, quis optio possimus,
                ducimus nihil consequuntur illum iusto fugit animi cum commodi
                debitis sint eaque laboriosam aspernatur porro sit molestias
                veritatis? Beatae rerum quasi esse minus, hic consequatur cumque
                accusantium aut facere fugit aliquam, numquam sunt alias
                molestiae blanditiis perferendis dolore? Doloremque deleniti
                maiores, quas molestiae nemo nulla asperiores voluptas repellat
                <br />
                <br />
                voluptate magnam fugit debitis totam, praesentium minima
                corrupti. Aperiam vitae deserunt modi cum sit non, omnis ad,
                natus consequuntur, ipsam repudiandae optio? Dignissimos ipsa,
                tempora voluptatem amet voluptatum aut veritatis odio officiis
                quas consectetur deserunt rem animi sit quo ab quis illum
                officia voluptate? Sit, at quibusdam! Sit nobis nostrum, eius
                sapiente aliquid obcaecati eos porro consectetur odit maxime vel
                neque nihil, fugiat quis quasi eveniet expedita accusamus.
                Reprehenderit excepturi et, in ipsa nisi totam? Expedita beatae
                accusantium aliquid, doloribus blanditiis earum veniam cum, iste
                error dicta modi inventore maiores ducimus! Voluptatem ducimus
                ipsum sint.
              </p>
            </section>

            <CommentsSection gameId={game.id} streamers={game.streamers} />
          </div>

          <GameDetailSidebar
            genre={d.genre}
            platforms={d.platforms}
            developer={d.developer}
            publisher={d.publisher}
            releaseDate={d.releaseDate}
            websiteUrl={d.websiteUrl}
            gameUrl={d.gameUrl}
          />
        </GameDetailContent>
      </GameDetail>
    </main>
  );
}
