import { describe, expect, it } from 'vitest';

import {
	postOpenGraphImageName,
	resolveOpenGraphImagePath,
	resolvePostOpenGraphImagePath,
} from './open_graph_image';

describe('resolveOpenGraphImagePath', () => {
	it('should keep the given image path when there is one', () => {
		expect(resolveOpenGraphImagePath('fr', '/og/posts/fr-homeflix.png')).toBe(
			'/og/posts/fr-homeflix.png'
		);
	});

	it('should fall back to the locale default when no image is given', () => {
		expect(resolveOpenGraphImagePath('fr', undefined)).toBe(
			'/og/default-fr.png'
		);
	});

	it('should pick the default matching the locale', () => {
		expect(resolveOpenGraphImagePath('en', undefined)).toBe(
			'/og/default-en.png'
		);
	});
});

describe('postOpenGraphImageName', () => {
	it('should namespace the card by locale so both translations differ', () => {
		expect(postOpenGraphImageName('en', 'homeflix')).not.toBe(
			postOpenGraphImageName('fr', 'homeflix')
		);
	});
});

describe('resolvePostOpenGraphImagePath', () => {
	it('should point at the generated card when it exists', () => {
		const generated = new Set(['fr-homeflix.png']);

		expect(resolvePostOpenGraphImagePath('fr', 'homeflix', generated)).toBe(
			'/og/posts/fr-homeflix.png'
		);
	});

	it('should return nothing when the card was never generated', () => {
		expect(
			resolvePostOpenGraphImagePath('fr', 'homeflix', new Set())
		).toBeUndefined();
	});

	it('should not reuse another locale card for a missing translation', () => {
		const generated = new Set(['en-homeflix.png']);

		expect(
			resolvePostOpenGraphImagePath('fr', 'homeflix', generated)
		).toBeUndefined();
	});
});
