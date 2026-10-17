import { z } from 'zod';

export const DocMetaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  icon: z.string().optional(),
  kind: z.enum(['react', 'html']),
  status: z.enum(['draft', 'active', 'archived']).default('active'),
  pinned: z.boolean().default(false),
  createdAt: z.string(), // ISO string
  updatedAt: z.string(), // ISO string
  accentColor: z.string().optional(),
});

export type DocMeta = z.infer<typeof DocMetaSchema>;
