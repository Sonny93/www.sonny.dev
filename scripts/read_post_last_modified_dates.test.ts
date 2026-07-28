import { describe, expect, it } from 'vitest';

import type { PostFrontmatter } from './read_post_frontmatters.js';
import { buildLastModifiedDates } from './read_post_last_modified_dates.js';

const SITE_URL = 'https://www.sonny.dev';

function buildPost(overrides: Partial<PostFrontmatter> = {}): PostFrontmatter {
	return {
		title: 'A post',
		description: 'A description.',
		tags: [],
		publishedAt: new Date('2024-02-29T00:00:00.000Z'),
		lang: 'en',
		urlSlug: 'a-post',
		...overrides,
	};
}

describe('buildLastModifiedDates', () => {
	it('should date an article from its publication when never updated', () => {
		const dates = buildLastModifiedDates([buildPost()], SITE_URL);

		expect(dates.get('https://www.sonny.dev/en/blog/a-post/')).toEqual(
			new Date('2024-02-29T00:00:00.000Z')
		);
	});

	it('should prefer the revision date over the publication date', () => {
		const post = buildPost({ updatedAt: new Date('2026-07-20T00:00:00.000Z') });

		expect(
			buildLastModifiedDates([post], SITE_URL).get(
				'https://www.sonny.dev/en/blog/a-post/'
			)
		).toEqual(new Date('2026-07-20T00:00:00.000Z'));
	});

	it('should date a blog index from its newest post', () => {
		const posts = [
			buildPost({ urlSlug: 'old', publishedAt: new Date('2024-01-01') }),
			buildPost({ urlSlug: 'recent', publishedAt: new Date('2026-01-01') }),
		];

		expect(
			buildLastModifiedDates(posts, SITE_URL).get(
				'https://www.sonny.dev/en/blog/'
			)
		).toEqual(new Date('2026-01-01'));
	});

	it('should not let a post date the index of another locale', () => {
		const posts = [
			buildPost({ lang: 'en', publishedAt: new Date('2026-01-01') }),
			buildPost({ lang: 'fr', publishedAt: new Date('2024-01-01') }),
		];

		expect(
			buildLastModifiedDates(posts, SITE_URL).get(
				'https://www.sonny.dev/fr/blog/'
			)
		).toEqual(new Date('2024-01-01'));
	});

	it('should leave out pages that have no change signal', () => {
		const dates = buildLastModifiedDates([buildPost()], SITE_URL);

		expect(dates.has('https://www.sonny.dev/en/')).toBe(false);
	});
});
