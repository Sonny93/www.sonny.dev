import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import vine from '@vinejs/vine';
import type { LoaderContract } from '@adonisjs/content/types';
import type { Infer, SchemaTypes } from '@vinejs/vine/types';

type PostSource = {
	title: string;
	description: string;
	tags: string[];
	slug: string;
	contentPath: string;
	publishedAt: string;
};

export class PostMarkdownLoader<
	Schema extends SchemaTypes,
> implements LoaderContract<Schema> {
	constructor(private source: string) {}

	async load(schema: Schema, metadata?: any): Promise<Infer<Schema>> {
		const rawPosts = await readFile(this.source, 'utf8');
		const posts = JSON.parse(rawPosts) as PostSource[];
		const baseDir = dirname(this.source);
		const hydratedPosts = await Promise.all(
			posts.map(async (post) => ({
				...post,
				content: await readFile(join(baseDir, post.contentPath), 'utf8'),
			})),
		);

		return vine.validate({
			schema,
			data: hydratedPosts,
			meta: { menuFileRoot: baseDir, ...metadata },
		});
	}
}
