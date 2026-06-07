import type { MiddlewareHandler } from "hono";
import { logger as honoLogger } from "hono/logger";

export const logger: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  const log = honoLogger();

  await log(c, next);

  const ms = Date.now() - start;
  const method = c.req.method;
  const path = c.req.path;
  const status = c.res.status;

  console.log(`${method} ${path} ${status} ${ms}ms`);
};
