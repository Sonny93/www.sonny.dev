import vine from '@vinejs/vine';
import app from '@adonisjs/core/services/app';
import { Collection } from '@adonisjs/content';

import { PostMarkdownLoader } from '../loaders/post_markdown_loader.js';
import { postSchema } from '#validator/post';
import { DateTime } from 'luxon';

export const postCollection = new Collection({
	schema: vine.array(postSchema),
	loader: new PostMarkdownLoader(app.makePath('data/posts.json')),
	cache: true,
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
