import { describe, expect, it } from 'vitest';

import { formatPeriod } from './format_period';

describe('formatPeriod', () => {
	it('should join both bounds with a dash', () => {
		expect(formatPeriod('2022-09-01', '2024-06-30')).toMatch(
			/^\w+ 2022 - \w+ 2024$/
		);
	});

	it('should drop the day, which a period does not need', () => {
		expect(formatPeriod('2022-09-01', '2022-09-30')).not.toMatch(/\b(1|30)\b/);
	});

	it('should keep both bounds even when they share a month', () => {
		const period = formatPeriod('2022-09-01', '2022-09-30');

		expect(period.split(' - ')).toHaveLength(2);
	});

	it('should reject an unparsable beginning date', () => {
		expect(() => formatPeriod('not-a-date', '2024-06-30')).toThrow(
			'Invalid ISO date: not-a-date'
		);
	});

	it('should reject an unparsable end date', () => {
		expect(() => formatPeriod('2022-09-01', 'nope')).toThrow(
			'Invalid ISO date: nope'
		);
	});
});
