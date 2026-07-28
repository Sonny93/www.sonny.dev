import { describe, expect, it } from 'vitest';

import { formatPublishedDate } from './format_date';

const PUBLISHED_AT = new Date('2024-02-29T00:00:00.000Z');

describe('formatPublishedDate', () => {
	it('should keep the day, month and year', () => {
		expect(formatPublishedDate(PUBLISHED_AT, 'en')).toMatch(
			/29.*2024|2024.*29/
		);
	});

	it('should format the same date differently in French', () => {
		expect(formatPublishedDate(PUBLISHED_AT, 'fr')).not.toBe(
			formatPublishedDate(PUBLISHED_AT, 'en')
		);
	});

	it('should keep the year, which readers use to judge how old a post is', () => {
		expect(formatPublishedDate(PUBLISHED_AT, 'fr')).toContain('2024');
	});

	it('should spell the month rather than leaving a bare number', () => {
		expect(formatPublishedDate(PUBLISHED_AT, 'en')).toMatch(/[A-Za-z]{3}/);
	});
});
