import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { appName } from "@maingame/brand";
import { HTTPException } from "hono/http-exception";
import { logger } from "./middleware/logger";
import health from "./routes/health";
import v1 from "./routes/v1";

const app = new Hono();

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      {
        error: error.message,
        status: error.status
      },
      error.status
    );
  }

  const isDevelopment = process.env.NODE_ENV === "development";

  return c.json(
    {
      error: isDevelopment
        ? error.message
        : "Internal server error",
      status: 500
    },
    500
  );
});

const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map((origin) =>
  origin.trim()
) ?? ["http://localhost:3000", "http://localhost:3001"];

app.use("*", logger);

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

app.route("/health", health);
app.route("/api/v1", v1);

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
