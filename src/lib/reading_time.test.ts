import { describe, expect, it } from 'vitest';

import { estimateReadingTimeMinutes } from './reading_time';

function buildWords(wordCount: number): string {
	return Array.from({ length: wordCount }, () => 'word').join(' ');
}

describe('estimateReadingTimeMinutes', () => {
	it('should count about one minute for an average reading speed', () => {
		expect(estimateReadingTimeMinutes(buildWords(225))).toBe(1);
	});

	it('should scale with the length of the content', () => {
		expect(estimateReadingTimeMinutes(buildWords(900))).toBe(4);
	});

	it('should ignore the surrounding whitespace layout', () => {
		expect(estimateReadingTimeMinutes('one   two\n\nthree\tfour')).toBe(
			estimateReadingTimeMinutes('one two three four')
		);
	});
});
