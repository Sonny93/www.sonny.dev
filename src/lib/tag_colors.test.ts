import { describe, expect, it } from 'vitest';

import { getTagColorClasses, TAG_COLOR_PALETTE } from './tag_colors';

describe('getTagColorClasses', () => {
	it('should always return a colour from the palette', () => {
		expect(TAG_COLOR_PALETTE).toContain(getTagColorClasses('docker'));
	});

	it('should give the same tag the same colour across renders', () => {
		expect(getTagColorClasses('kubernetes')).toBe(
			getTagColorClasses('kubernetes')
		);
	});

	it('should keep an empty tag inside the palette', () => {
		expect(TAG_COLOR_PALETTE).toContain(getTagColorClasses(''));
	});

	it('should spread tags over several colours rather than collapsing them', () => {
		const tags = ['docker', 'linux', 'ssh', 'dns', 'devops', 'homelab'];
		const usedColours = new Set(tags.map(getTagColorClasses));

		expect(usedColours.size).toBeGreaterThan(1);
	});
});
