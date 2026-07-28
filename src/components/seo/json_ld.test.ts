import { describe, expect, it } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import JsonLd from './json_ld.astro';

async function renderSchema(
	schema: Readonly<Record<string, unknown>>
): Promise<string> {
	const container = await AstroContainer.create();
	return container.renderToString(JsonLd, { props: { schema } });
}

describe('JsonLd', () => {
	it('should emit the schema in a ld+json script', async () => {
		const html = await renderSchema({ '@type': 'Person' });

		expect(html).toContain('<script type="application/ld+json">');
	});

	it('should keep the schema parsable', async () => {
		const html = await renderSchema({ '@type': 'Person', name: 'Sonny' });
		const serialized = html.replace(/^[\s\S]*?>|<\/script>[\s\S]*$/g, '');

		expect(JSON.parse(serialized)).toEqual({
			'@type': 'Person',
			name: 'Sonny',
		});
	});

	it('should not let a value close the script tag early', async () => {
		const html = await renderSchema({ headline: '</script><img onerror=x>' });

		expect(html).not.toContain('</script><img');
	});

	it('should escape every lower-than sign it serialises', async () => {
		const html = await renderSchema({ headline: 'a < b' });

		expect(html).toContain('\\u003c');
	});
});
