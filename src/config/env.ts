import { z } from 'zod';

const envSchema = z.object({
  VITE_GITHUB_TOKEN: z.string().optional(),
  VITE_LEETCODE_PROVIDER: z.enum(['community', 'serverless']).default('community'),
  VITE_LEETCODE_SERVERLESS_URL: z.string().optional(),
});

// Vite exposes env vars on import.meta.env
// We parse them safely
export const env = envSchema.parse({
  VITE_GITHUB_TOKEN: import.meta.env?.VITE_GITHUB_TOKEN,
  VITE_LEETCODE_PROVIDER: import.meta.env?.VITE_LEETCODE_PROVIDER || 'community',
  VITE_LEETCODE_SERVERLESS_URL: import.meta.env?.VITE_LEETCODE_SERVERLESS_URL,
});
