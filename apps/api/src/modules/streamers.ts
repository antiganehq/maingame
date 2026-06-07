import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { success, paginated } from "../helpers/response";
import * as streamerService from "../services/streamer.service";

const streamers = new Hono();

streamers.get("/", async (c) => {
  const platform = c.req.query("platform");
  const page = parseInt(c.req.query("page") ?? "1", 10);
  const limit = parseInt(c.req.query("limit") ?? "20", 10);

  const { streamers: streamersList, total } = await streamerService.listStreamers({
    platform,
    page,
    limit
  });

  return paginated(c, streamersList, page, limit, total);
});

streamers.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const streamer = await streamerService.getStreamerBySlug(slug);

  if (!streamer) {
    throw new HTTPException(404, { message: "Streamer not found" });
  }

  return success(c, streamer);
});

export default streamers;
