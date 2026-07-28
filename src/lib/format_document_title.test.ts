import { describe, expect, it } from 'vitest';

import { formatDocumentTitle } from './format_document_title';

describe('formatDocumentTitle', () => {
	it('should append the site name to a page title', () => {
		expect(formatDocumentTitle('Projects')).toBe('Projects · Sonny');
	});

	it('should keep the page title first so search results lead with the page', () => {
		expect(formatDocumentTitle('Blog articles')).toMatch(/^Blog articles/);
	});
});
