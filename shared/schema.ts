import { z } from "zod";

export const nationSchema = z.enum(["domestic", "export"]);
export type Nation = z.infer<typeof nationSchema>;

export const radarModelSchema = z.object({
  rank: z.number(),
  prevRank: z.number().nullable(),
  modelName: z.string(),
  manufacturer: z.string(),
  sales: z.number(),
  prevSales: z.number(),
  momAbs: z.number(),
  momPct: z.number(),
  rankChange: z.number(),
  score: z.number(),
  danawaUrl: z.string(),
});

export type RadarModel = z.infer<typeof radarModelSchema>;

export const radarDataSchema = z.object({
  month: z.string(),
  nation: nationSchema,
  models: z.array(radarModelSchema),
  totalModels: z.number(),
  avgGrowth: z.number(),
  topGainer: z.string(),
  updatedAt: z.string(),
});

export type RadarData = z.infer<typeof radarDataSchema>;

export const filterOptionsSchema = z.object({
  minSales: z.number().default(0),
  includeNewEntries: z.boolean().default(true),
});

export type FilterOptions = z.infer<typeof filterOptionsSchema>;

export const availableMonthsSchema = z.array(z.string());
export type AvailableMonths = z.infer<typeof availableMonthsSchema>;

export const users = {};
export type User = { id: string; username: string; password: string };
export type InsertUser = { username: string; password: string };
