import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import ArticleMeta from './article_meta.astro';

const PUBLISHED_AT = new Date('2024-02-29T00:00:00.000Z');

async function renderMeta(props: {
	publishedAt: Date;
	updatedAt: Date | undefined;
	tags: readonly string[];
}): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(ArticleMeta, { props });
}

describe('ArticleMeta', () => {
	it('should publish the publication date as an ISO timestamp', async () => {
		const html = await renderMeta({
			publishedAt: PUBLISHED_AT,
			updatedAt: undefined,
			tags: [],
		});

		expect(html).toContain(
			'<meta property="article:published_time" content="2024-02-29T00:00:00.000Z">'
		);
	});

	it('should announce a revision when the article was updated', async () => {
		const html = await renderMeta({
			publishedAt: PUBLISHED_AT,
			updatedAt: new Date('2026-07-20T00:00:00.000Z'),
			tags: [],
		});

		expect(html).toContain(
			'<meta property="article:modified_time" content="2026-07-20T00:00:00.000Z">'
		);
	});

	it('should claim no revision when the article was never updated', async () => {
		const html = await renderMeta({
			publishedAt: PUBLISHED_AT,
			updatedAt: undefined,
			tags: [],
		});

		expect(html).not.toContain('article:modified_time');
	});

	it('should emit one tag meta per topic', async () => {
		const html = await renderMeta({
			publishedAt: PUBLISHED_AT,
			updatedAt: undefined,
			tags: ['docker', 'linux'],
		});

		expect(html.match(/article:tag/g)).toHaveLength(2);
	});

	it('should escape the quote so a tag cannot terminate the attribute', async () => {
		const html = await renderMeta({
			publishedAt: PUBLISHED_AT,
			updatedAt: undefined,
			tags: ['"><img onerror=x>'],
		});

		expect(html).toContain('content="&quot;><img onerror=x>"');
	});
});
