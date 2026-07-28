import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import SectionTitle from './section_title.astro';

async function renderTitle(props: {
	title: string;
	level?: 'h1' | 'h2';
}): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(SectionTitle, { props });
}

describe('SectionTitle', () => {
	it('should render a section heading by default', async () => {
		const html = await renderTitle({ title: 'Latest articles' });

		expect(html).toContain('<h2');
	});

	it('should render a page heading when asked for one', async () => {
		const html = await renderTitle({ title: 'Blog', level: 'h1' });

		expect(html).toContain('<h1');
	});

	it('should never emit both heading levels at once', async () => {
		const html = await renderTitle({ title: 'Blog', level: 'h1' });

		expect(html).not.toContain('<h2');
	});

	it('should escape the title so content cannot inject markup', async () => {
		const html = await renderTitle({ title: '<img onerror=x>' });

		expect(html).not.toContain('<img');
	});
});
