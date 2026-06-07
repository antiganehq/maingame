import { z } from "zod";
import { StreamPlatform } from "@maingame/types";

export const slugSchema = z
  .string()
  .min(3)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const dotsAmountSchema = z
  .number()
  .int()
  .positive()
  .max(1_000_000);

export const studioRegistrationSchema = z.object({
  name: z.string().min(2).max(120),
  websiteUrl: z.string().url().optional()
});

export const gameCreateSchema = z.object({
  title: z.string().min(2).max(120),
  slug: slugSchema,
  shortDescription: z.string().min(20).max(240)
});

export const streamerProfileSchema = z.object({
  displayName: z.string().min(2).max(80),
  slug: slugSchema,
  primaryPlatform: z.nativeEnum(StreamPlatform),
  channelUrl: z.string().url()
});

export const campaignOfferSchema = z.object({
  gameId: z.string().uuid(),
  streamerId: z.string().uuid(),
  dotsBudget: dotsAmountSchema,
  scheduledAt: z.string().datetime().optional(),
  brief: z.string().min(20).max(2000)
});

export const archiveSubmissionSchema = z.object({
  campaignId: z.string().uuid(),
  liveUrl: z.string().url().optional(),
  archiveUrl: z.string().url(),
  notes: z.string().max(1000).optional()
});

export { createGameSchema, updateGameSchema } from "./games";

export type StudioRegistrationInput = z.infer<typeof studioRegistrationSchema>;
export type GameCreateInput = z.infer<typeof gameCreateSchema>;
export type StreamerProfileInput = z.infer<typeof streamerProfileSchema>;
export type CampaignOfferInput = z.infer<typeof campaignOfferSchema>;
export type ArchiveSubmissionInput = z.infer<typeof archiveSubmissionSchema>;
export type CreateGameInput = z.infer<typeof import("./games").createGameSchema>;
export type UpdateGameInput = z.infer<typeof import("./games").updateGameSchema>;
