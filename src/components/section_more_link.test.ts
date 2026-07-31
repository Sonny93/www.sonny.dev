import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import SectionMoreLink from './section_more_link.astro';

async function renderMoreLink(props: {
	href: string;
	label: string;
}): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(SectionMoreLink, { props });
}

describe('SectionMoreLink', () => {
	it('should link to the given destination', async () => {
		const html = await renderMoreLink({
			href: '/fr/blog',
			label: 'Voir tous les articles',
		});

		expect(html).toContain('href="/fr/blog"');
	});

	it('should render the given label', async () => {
		const html = await renderMoreLink({
			href: '/fr/blog',
			label: 'Voir tous les articles',
		});

		expect(html).toContain('Voir tous les articles');
	});

	it('should escape the label so content cannot inject markup', async () => {
		const html = await renderMoreLink({
			href: '/fr/blog',
			label: '<img onerror=x>',
		});

		expect(html).not.toContain('<img');
	});
});
