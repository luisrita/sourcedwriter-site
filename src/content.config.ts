import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    order: z.number(),
    updated: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const localized = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/localized' }),
  schema: z.object({
    locale: z.enum(['ja', 'es', 'de', 'fr', 'pt-BR']),
    route: z.string(),
    sourceRevision: z.string().min(7),
    reviewStatus: z.enum(['needs-review', 'reviewed']),
    reviewer: z.string().min(1).nullable(),
    title: z.string(),
    description: z.string().max(160),
    sections: z.array(z.object({ title: z.string(), anchors: z.array(z.string().regex(/^[a-z0-9-]+$/)).optional(), paragraphs: z.array(z.string()) })),
  }).refine((entry) => entry.reviewStatus !== 'reviewed' || entry.reviewer !== null, { message: 'Reviewed content requires a reviewer' }),
});

export const collections = { docs, blog, localized };
