import { z } from "zod";

export const createGameSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10).max(5000),
  genre: z.string().max(100).optional(),
  platforms: z.array(z.string()).min(1),
  coverImage: z.string().url().optional(),
  screenshots: z.array(z.string().url()).optional(),
  trailerUrl: z.string().url().optional(),
  gameUrl: z.string().url().optional(),
  campaignObjective: z.string().max(2000).optional(),
  budgetMinDots: z.number().int().positive().optional(),
  budgetMaxDots: z.number().int().positive().optional()
});

export const updateGameSchema = createGameSchema.partial();

export type CreateGameInput = z.infer<typeof createGameSchema>;
export type UpdateGameInput = z.infer<typeof updateGameSchema>;
