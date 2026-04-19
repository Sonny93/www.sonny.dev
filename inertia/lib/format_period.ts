import { DateTime } from 'luxon';

function parseStructuredDate(value: unknown): DateTime | null {
	if (value instanceof Date) {
		const d = DateTime.fromJSDate(value);
		return d.isValid ? d : null;
	}
	if (typeof value === 'string') {
		const d = DateTime.fromISO(value);
		return d.isValid ? d : null;
	}
	return null;
}

export function formatStructuredPeriod(
	beginningDate: unknown,
	endDate: unknown,
	locale = 'en-GB'
) {
	const start = parseStructuredDate(beginningDate);
	const end = parseStructuredDate(endDate);
	if (!start || !end) return '';
	const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
	return `${start.setLocale(locale).toLocaleString(opts)} – ${end.setLocale(locale).toLocaleString(opts)}`;
}
