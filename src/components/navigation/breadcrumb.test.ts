import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import Breadcrumb from './breadcrumb.astro';
import type { BreadcrumbTrailItem } from '../../lib/structured_data';

const TRAIL: readonly BreadcrumbTrailItem[] = [
	{ kind: 'ancestor', name: 'Home', url: '/en/' },
	{ kind: 'ancestor', name: 'Blog', url: '/en/blog/' },
	{ kind: 'current', name: 'Build your own Netflix at home' },
];

async function renderTrail(
	trail: readonly BreadcrumbTrailItem[]
): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(Breadcrumb, { props: { trail } });
}

describe('Breadcrumb', () => {
	it('should link every ancestor', async () => {
		const html = await renderTrail(TRAIL);

		expect(html.match(/<a /g)).toHaveLength(2);
	});

	it('should not repeat the current page, which the heading already states', async () => {
		const html = await renderTrail(TRAIL);

		expect(html).not.toContain('Build your own Netflix at home');
	});

	it('should place one separator between the ancestors, not before the first', async () => {
		const html = await renderTrail(TRAIL);

		expect(html.match(/›/g)).toHaveLength(1);
	});

	it('should hide the separator from assistive technology', async () => {
		const html = await renderTrail(TRAIL);

		expect(html).toContain('aria-hidden="true">›');
	});

	it('should label the navigation landmark', async () => {
		const html = await renderTrail(TRAIL);

		expect(html).toContain('<nav aria-label="Breadcrumb">');
	});

	it('should render nothing when there is no ancestor to go back to', async () => {
		const html = await renderTrail([{ kind: 'current', name: 'Orphan' }]);

		expect(html.trim()).toBe('');
	});
});
