import vine from '@vinejs/vine';
import { DateTime } from 'luxon';
import app from '@adonisjs/core/services/app';
import { Collection } from '@adonisjs/content';

import { postSchema } from '#validator/post';
import { PostMarkdownLoader } from '../loaders/post_markdown_loader.js';

export const postCollection = new Collection({
	schema: vine.array(postSchema),
	loader: new PostMarkdownLoader(app.makePath('data/posts.json')),
	cache: app.inProduction,
	views: {
		published: (posts) => {
			const now = DateTime.now().toMillis();

			return [...posts]
				.filter((p) => p.publishedAt.toMillis() <= now)
				.sort((a, b) => {
					const t = b.publishedAt.toMillis() - a.publishedAt.toMillis();
					return t !== 0 ? t : a.slug.localeCompare(b.slug);
				});
		},
		findBySlug: (posts, slug: string) => posts.find((p) => p.slug === slug),
	},
});
