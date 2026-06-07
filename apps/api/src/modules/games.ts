import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { createGameSchema, updateGameSchema } from "@maingame/validators";
import { requireAuth } from "../middleware/auth";
import { success, paginated, validationError } from "../helpers/response";
import * as gameService from "../services/game.service";

const games = new Hono();

games.get("/", async (c) => {
  const status = c.req.query("status");
  const genre = c.req.query("genre");
  const page = parseInt(c.req.query("page") ?? "1", 10);
  const limit = parseInt(c.req.query("limit") ?? "20", 10);

  const { games: gamesList, total } = await gameService.listGames({
    status: status ?? "PUBLISHED",
    genre,
    page,
    limit
  });

  return paginated(c, gamesList, page, limit, total);
});

games.get("/slug/:slug", async (c) => {
  const slug = c.req.param("slug");
  const game = await gameService.getGameBySlug(slug);

  if (!game) {
    throw new HTTPException(404, { message: "Game not found" });
  }

  return success(c, game);
});

games.get("/:id", async (c) => {
  const id = c.req.param("id");
  const game = await gameService.getGameById(id);

  if (!game) {
    throw new HTTPException(404, { message: "Game not found" });
  }

  return success(c, game);
});

games.post("/", requireAuth(), async (c) => {
  const auth = c.get("auth");

  const body = await c.req.json();
  const parsed = createGameSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const gameDevProfile = await gameService.getGameDevProfile(auth.userId);

  if (!gameDevProfile) {
    throw new HTTPException(403, { message: "GameDev profile required" });
  }

  const game = await gameService.createGame({
    ...parsed.data,
    developerId: gameDevProfile.id
  });

  return success(c, game, 201);
});

games.put("/:id", requireAuth(), async (c) => {
  const auth = c.get("auth");
  const id = c.req.param("id");

  const existing = await gameService.getGameById(id);

  if (!existing) {
    throw new HTTPException(404, { message: "Game not found" });
  }

  const gameDevProfile = await gameService.getGameDevProfile(auth.userId);

  if (!gameDevProfile || existing.developerId !== gameDevProfile.id) {
    throw new HTTPException(403, { message: "Not authorized to update this game" });
  }

  const body = await c.req.json();
  const parsed = updateGameSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const updated = await gameService.updateGame(id, parsed.data);

  return success(c, updated);
});

games.patch("/:id/status", requireAuth(), async (c) => {
  const auth = c.get("auth");
  const id = c.req.param("id");

  const existing = await gameService.getGameById(id);

  if (!existing) {
    throw new HTTPException(404, { message: "Game not found" });
  }

  const gameDevProfile = await gameService.getGameDevProfile(auth.userId);

  if (!gameDevProfile || existing.developerId !== gameDevProfile.id) {
    throw new HTTPException(403, { message: "Not authorized to update this game" });
  }

  const body = await c.req.json();
  const statusSchema = z.object({ status: z.enum(["DRAFT", "PUBLISHED", "PAUSED", "ARCHIVED"]) });
  const parsed = statusSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const updated = await gameService.updateGameStatus(id, parsed.data.status);

  return success(c, updated);
});

games.delete("/:id", requireAuth(), async (c) => {
  const auth = c.get("auth");
  const id = c.req.param("id");

  const existing = await gameService.getGameById(id);

  if (!existing) {
    throw new HTTPException(404, { message: "Game not found" });
  }

  const gameDevProfile = await gameService.getGameDevProfile(auth.userId);

  if (!gameDevProfile || existing.developerId !== gameDevProfile.id) {
    throw new HTTPException(403, { message: "Not authorized to delete this game" });
  }

  await gameService.deleteGame(id);

  return success(c, { id });
});

export default games;
