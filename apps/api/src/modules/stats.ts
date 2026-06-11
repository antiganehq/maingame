import { Hono } from "hono";
import { success } from "../helpers/response";
import * as statsService from "../services/stats.service";

const stats = new Hono();

stats.get("/", async (c) => {
  const data = await statsService.getPublicStats();
  return success(c, data);
});

stats.get("/top-games", async (c) => {
  const limit = parseInt(c.req.query("limit") ?? "10", 10);
  const games = await statsService.getTopGames(limit);
  return success(c, games);
});

stats.get("/top-streamers", async (c) => {
  const limit = parseInt(c.req.query("limit") ?? "10", 10);
  const streamers = await statsService.getTopStreamers(limit);
  return success(c, streamers);
});

export default stats;
