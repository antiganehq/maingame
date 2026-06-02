import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { appName } from "@maingame/brand";

const app = new Hono();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) =>
  origin.trim()
) ?? ["http://localhost:3000", "http://localhost:3001"];

app.use(
  "*",
  cors({
    origin: allowedOrigins
  })
);

app.get("/", (c) =>
  c.json({
    name: `${appName} API`,
    status: "ok"
  })
);

app.get("/health", (c) =>
  c.json({
    status: "ok",
    service: "api"
  })
);

const port = Number(process.env.API_PORT ?? 8787);

serve(
  {
    fetch: app.fetch,
    port
  },
  (info) => {
    console.log(`maingame.fun API listening on http://localhost:${info.port}`);
  }
);
