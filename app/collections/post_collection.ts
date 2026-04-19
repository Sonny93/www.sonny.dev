import vine from '@vinejs/vine';
import app from '@adonisjs/core/services/app';
import { Collection } from '@adonisjs/content';
import { loaders } from '@adonisjs/content/loaders';

import { postSchema } from '#validator/post';

export const postCollection = new Collection({
	schema: vine.array(postSchema),
	loader: loaders.jsonLoader(app.makePath('data/posts.json')),
	cache: true,
	views: {
		published: (posts) =>
			[...posts]
				.filter((p) => new Date(p.publishedAt).getTime() <= Date.now())
				.sort((a, b) => {
					const t =
						new Date(b.publishedAt).getTime() -
						new Date(a.publishedAt).getTime();
					return t !== 0 ? t : a.slug.localeCompare(b.slug);
				}),
		findBySlug: (posts, slug: string) => posts.find((p) => p.slug === slug),
	},
});
