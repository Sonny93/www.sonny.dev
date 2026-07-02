import { getCollection, type CollectionEntry } from 'astro:content';

import type { Locale } from '../i18n/ui';

type Post = CollectionEntry<'posts'>;

function byMostRecentlyPublished(firstPost: Post, secondPost: Post): number {
	const publishedAtDifference =
		secondPost.data.publishedAt.getTime() -
		firstPost.data.publishedAt.getTime();
	if (publishedAtDifference !== 0) return publishedAtDifference;
	return firstPost.id.localeCompare(secondPost.id);
}

export async function getPublishedPosts(
	locale: Locale
): Promise<readonly Post[]> {
	const buildTimeMilliseconds = Date.now();
	const publishedPosts = await getCollection(
		'posts',
		(post) =>
			post.data.lang === locale &&
			post.data.publishedAt.getTime() <= buildTimeMilliseconds
	);
	return [...publishedPosts].sort(byMostRecentlyPublished);
}
