import type { MiddlewareHandler, Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrivyClient } from "@privy-io/server-auth";

export interface AuthContext {
  userId: string;
  privyId: string;
}

declare module "hono" {
  interface ContextVariableMap {
    auth: AuthContext;
  }
}

let privyClient: PrivyClient | null = null;

function getPrivyClient(): PrivyClient {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const privyAppSecret = process.env.PRIVY_APP_SECRET;

  if (!privyAppId || !privyAppSecret) {
    throw new HTTPException(500, { message: "Privy configuration missing" });
  }

  if (!privyClient) {
    privyClient = new PrivyClient(privyAppId, privyAppSecret);
  }

  return privyClient;
}

export function requireAuth(): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HTTPException(401, { message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const client = getPrivyClient();
      const verified = await client.verifyAuthToken(token);

      c.set("auth", {
        userId: verified.userId,
        privyId: verified.userId
      });

      await next();
    } catch {
      throw new HTTPException(401, { message: "Invalid or expired token" });
    }
  };
}
