"use client";

import { useState } from "react";
import { SectionHeading } from "@maingame/components";
import { Button, Badge } from "@maingame/components";
import { Input, Textarea } from "@maingame/components";
import { FormField, FormLabel } from "@maingame/components";
import { GameStatus } from "@maingame/types";
import { allGames } from "@maingame/db";
import type { GameData } from "@maingame/db";

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "success" | "warning" | "danger"
> = {
  [GameStatus.Draft]: "secondary",
  [GameStatus.Published]: "success",
  [GameStatus.Paused]: "warning",
  [GameStatus.Archived]: "danger",
  [GameStatus.Rejected]: "danger",
};

type GameFormData = {
  title: string;
  slug: string;
  description: string;
  genre: string;
  platformsInput: string;
  tagsInput: string;
  coverImage: string;
  horizontalCoverImage: string;
  screenshots: string[];
  trailerUrl: string;
  gameUrl: string;
  websiteUrl: string;
  campaignObjective: string;
  budgetMinDots: number | null;
  budgetMaxDots: number | null;
  streamerCount: number;
  streamers: { id: string; name: string }[];
  status: string;
  publisher: string;
  releaseDate: string;
};

function gameToForm(g: GameData): GameFormData {
  return {
    title: g.title,
    slug: g.slug,
    description: g.description,
    genre: g.genre ?? "",
    platformsInput: g.platforms.join(", "),
    tagsInput: g.tags.join(", "),
    coverImage: g.coverImage ?? "",
    horizontalCoverImage: g.horizontalCoverImage ?? "",
    screenshots: g.screenshots,
    trailerUrl: g.trailerUrl ?? "",
    gameUrl: g.gameUrl ?? "",
    websiteUrl: g.websiteUrl ?? "",
    campaignObjective: g.campaignObjective ?? "",
    budgetMinDots: g.budgetMinDots,
    budgetMaxDots: g.budgetMaxDots,
    streamerCount: g.streamerCount,
    streamers: g.streamers,
    status: g.status,
    publisher: g.publisher,
    releaseDate: g.releaseDate,
  };
}

const emptyForm: GameFormData = {
  title: "",
  slug: "",
  description: "",
  genre: "",
  platformsInput: "",
  tagsInput: "",
  coverImage: "",
  horizontalCoverImage: "",
  screenshots: [],
  trailerUrl: "",
  gameUrl: "",
  websiteUrl: "",
  campaignObjective: "",
  budgetMinDots: null,
  budgetMaxDots: null,
  streamerCount: 0,
  streamers: [],
  status: "DRAFT",
  publisher: "Nusantara Games",
  releaseDate: new Date().toISOString().split("T")[0],
};

export default function MyGamesPage() {
  const [games, setGames] = useState<GameData[]>(() =>
    allGames.filter((g) => g.developer.studioName === "Nusantara Games"),
  );
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<GameFormData>(emptyForm);

  const totalStreamers = games.reduce((s, g) => s + g.streamerCount, 0);

  const startEdit = (slug: string) => {
    const g = games.find((x) => x.slug === slug);
    if (!g) return;
    setForm(gameToForm(g));
    setEditingSlug(slug);
    setIsCreating(false);
  };

  const startCreate = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setIsCreating(true);
  };

  const cancel = () => {
    setEditingSlug(null);
    setIsCreating(false);
    setForm(emptyForm);
  };

  const handleSave = () => {
    const updated: GameData = {
      ...games[0],
      ...form,
      platforms: form.platformsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: form.tagsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (isCreating) {
      setGames((prev) => [
        { ...updated, id: `new-${Date.now()}`, streamerCount: 0, slug: form.slug || `game-${Date.now()}` },
        ...prev,
      ]);
    } else {
      setGames((prev) =>
        prev.map((g) => (g.slug === editingSlug ? { ...g, ...updated } : g)),
      );
    }
    cancel();
  };

  const handleDelete = (slug: string) => {
    setGames((prev) => prev.filter((g) => g.slug !== slug));
  };

  if (isCreating || editingSlug) {
    return (
      <div className="px-6 py-8 space-y-6">
        <SectionHeading
          text1={isCreating ? "Create" : "Edit"}
          text2="Game"
        />
        <div className="grid gap-4 max-w-2xl">
          <FormField>
            <FormLabel>Title</FormLabel>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Slug</FormLabel>
            <Input
              value={form.slug}
              onChange={(e) =>
                setForm((f) => ({ ...f, slug: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Genre</FormLabel>
            <Input
              value={form.genre}
              onChange={(e) =>
                setForm((f) => ({ ...f, genre: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Platforms (comma-separated)</FormLabel>
            <Input
              value={form.platformsInput}
              onChange={(e) =>
                setForm((f) => ({ ...f, platformsInput: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Tags (comma-separated)</FormLabel>
            <Input
              value={form.tagsInput}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagsInput: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Cover Image URL</FormLabel>
            <Input
              value={form.coverImage}
              onChange={(e) =>
                setForm((f) => ({ ...f, coverImage: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Game URL</FormLabel>
            <Input
              value={form.gameUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, gameUrl: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Website URL</FormLabel>
            <Input
              value={form.websiteUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, websiteUrl: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Trailer URL</FormLabel>
            <Input
              value={form.trailerUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, trailerUrl: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Campaign Objective</FormLabel>
            <Textarea
              value={form.campaignObjective}
              onChange={(e) =>
                setForm((f) => ({ ...f, campaignObjective: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Budget Min Dots</FormLabel>
            <Input
              type="number"
              value={form.budgetMinDots ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  budgetMinDots: e.target.value ? Number(e.target.value) : null,
                }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Budget Max Dots</FormLabel>
            <Input
              type="number"
              value={form.budgetMaxDots ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  budgetMaxDots: e.target.value ? Number(e.target.value) : null,
                }))
              }
            />
          </FormField>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSave}>Save Changes</Button>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <SectionHeading text1="My" text2="Games" />
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
            {games.length} game{games.length !== 1 ? "s" : ""} published
            {totalStreamers > 0 &&
              ` · ${totalStreamers} total streamers`}
          </p>
        </div>
        <Button onClick={startCreate}>Create New Game</Button>
      </div>

      {games.length === 0 ? (
        <p className="text-sm text-[var(--color-muted-foreground)]">
          No games yet. Create your first game to start attracting streamers.
        </p>
      ) : (
        <div className="space-y-2">
          {games.map((g) => (
            <div
              key={g.id}
              className="flex items-center gap-4 border border-[var(--color-border-light)] p-4"
            >
              <div className="h-[45px] w-20 shrink-0 overflow-hidden bg-[var(--color-surface)]">
                {g.coverImage ? (
                  <img
                    src={g.coverImage}
                    alt={g.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-[var(--color-muted-foreground)]">
                    ?
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] truncate">
                    {g.title}
                  </h3>
                  <Badge
                    variant={STATUS_VARIANT[g.status] ?? "secondary"}
                  >
                    {g.status}
                  </Badge>
                </div>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                  {g.genre && <span>{g.genre} &middot; </span>}
                  {g.streamerCount} streamer
                  {g.streamerCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="secondary"
                  onClick={() => startEdit(g.slug)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(g.slug)}
                  className="text-[var(--color-error)] hover:text-[var(--color-error)]"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
