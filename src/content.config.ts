import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

const posts = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		publishedAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		lang: z.enum(['en', 'fr']).default('fr'),
		urlSlug: z.string(),
	}),
});

export const collections = { posts };
