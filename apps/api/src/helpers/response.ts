import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface SuccessResponse<T> {
  data: T;
}

interface ErrorResponse {
  error: string;
  status: number;
  details?: Record<string, unknown>;
}

export function success<T>(c: Context, data: T, status: ContentfulStatusCode = 200) {
  return c.json<SuccessResponse<T>>({ data }, status);
}

export function paginated<T>(
  c: Context,
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return c.json<PaginatedResponse<T>>({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
}

export function error(c: Context, message: string, status: ContentfulStatusCode, details?: Record<string, unknown>) {
  return c.json<ErrorResponse>({ error: message, status, details }, status);
}

export function validationError(c: Context, details: Record<string, unknown>) {
  return error(c, "Validation failed", 400, details);
}

export function notFound(c: Context, message = "Resource not found") {
  return error(c, message, 404);
}

export function unauthorized(c: Context, message = "Unauthorized") {
  return error(c, message, 401);
}

export function forbidden(c: Context, message = "Forbidden") {
  return error(c, message, 403);
}
