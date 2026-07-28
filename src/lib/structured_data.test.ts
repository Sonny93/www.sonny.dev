import { describe, expect, it } from 'vitest';

import {
	buildArticleSchema,
	buildBreadcrumbSchema,
	buildHomeSchema,
	type BreadcrumbTrailItem,
} from './structured_data';

const SITE_URL = new URL('https://www.sonny.dev');
const PERSON_ID = 'https://www.sonny.dev/#person';

function buildHome() {
	return buildHomeSchema({
		siteUrl: SITE_URL,
		homeUrl: 'https://www.sonny.dev/en/',
		jobTitle: 'Full-stack & DevOps engineer',
		description: 'Rigorous architecture.',
		locale: 'en',
	});
}

function buildArticle(updatedAt?: Date) {
	return buildArticleSchema({
		siteUrl: SITE_URL,
		articleUrl: 'https://www.sonny.dev/en/blog/homeflix/',
		headline: 'Build your own Netflix at home',
		description: 'A guide.',
		publishedAt: new Date('2025-11-05T00:00:00.000Z'),
		updatedAt,
		tags: ['docker', 'jellyfin'],
		imageUrl: 'https://www.sonny.dev/og/posts/en-homeflix.png',
		locale: 'en',
	});
}

describe('buildHomeSchema', () => {
	it('should describe the person and the website together', () => {
		const graph = buildHome()['@graph'];

		expect(graph).toHaveLength(2);
	});

	it('should let the website reference the person by id', () => {
		const [person, website] = buildHome()['@graph'] as [
			Record<string, unknown>,
			Record<string, unknown>,
		];

		expect(website.publisher).toEqual({ '@id': person['@id'] });
	});

	it('should list the social profiles so the person can be identified', () => {
		const [person] = buildHome()['@graph'] as [Record<string, unknown>];

		expect(person.sameAs).toContain('https://github.com/sonny93');
	});
});

describe('buildArticleSchema', () => {
	it('should report the revision date when the article was updated', () => {
		const schema = buildArticle(new Date('2026-07-20T00:00:00.000Z'));

		expect(schema.dateModified).toBe('2026-07-20T00:00:00.000Z');
	});

	it('should fall back to the publication date when never updated', () => {
		expect(buildArticle().dateModified).toBe('2025-11-05T00:00:00.000Z');
	});

	it('should credit the same person as the homepage', () => {
		expect(buildArticle().author).toMatchObject({ '@id': PERSON_ID });
	});

	it('should expose the tags as keywords', () => {
		expect(buildArticle().keywords).toEqual(['docker', 'jellyfin']);
	});
});

describe('buildBreadcrumbSchema', () => {
	const trail: readonly BreadcrumbTrailItem[] = [
		{ kind: 'ancestor', name: 'Home', url: '/en/' },
		{ kind: 'ancestor', name: 'Blog', url: '/en/blog/' },
		{ kind: 'current', name: 'Build your own Netflix at home' },
	];

	function itemsOf(): readonly Record<string, unknown>[] {
		return buildBreadcrumbSchema(trail, SITE_URL)
			.itemListElement as readonly Record<string, unknown>[];
	}

	it('should number the crumbs from one', () => {
		expect(itemsOf().map((item) => item.position)).toEqual([1, 2, 3]);
	});

	it('should turn ancestor paths into absolute urls', () => {
		expect(itemsOf()[0].item).toBe('https://www.sonny.dev/en/');
	});

	it('should leave the current page without a url', () => {
		expect(itemsOf().at(-1)).not.toHaveProperty('item');
	});
});
