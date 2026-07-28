import { describe, expect, it } from 'vitest';

import { escapeHtml } from './escape_html';

describe('escapeHtml', () => {
	it('should neutralise a tag so it cannot open an element', () => {
		expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
	});

	it('should escape quotes so a value cannot break out of an attribute', () => {
		expect(escapeHtml('a" onload="x')).toBe('a&quot; onload=&quot;x');
	});

	it('should escape the ampersand first so escapes are not double decoded', () => {
		expect(escapeHtml('&lt;')).toBe('&amp;lt;');
	});

	it('should leave text without special characters untouched', () => {
		expect(escapeHtml('Kubernetes & Minikube')).toBe(
			'Kubernetes &amp; Minikube'
		);
	});
});
