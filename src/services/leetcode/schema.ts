import { z } from 'zod';

export const LeetCodeStatsSchema = z.object({
  totalSolved: z.number(),
  easySolved: z.number(),
  mediumSolved: z.number(),
  hardSolved: z.number(),
  ranking: z.number(),
  acceptanceRate: z.number(),
});

export type LeetCodeStats = z.infer<typeof LeetCodeStatsSchema>;
