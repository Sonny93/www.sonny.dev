const PERIOD_LOCALE = 'en-GB';

const PERIOD_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	month: 'short',
	year: 'numeric',
};

function parseIsoDate(isoDate: string): Date {
	const parsedDate = new Date(isoDate);
	if (Number.isNaN(parsedDate.getTime())) {
		throw new Error(`Invalid ISO date: ${isoDate}`);
	}
	return parsedDate;
}

export function formatPeriod(
	beginningIsoDate: string,
	endIsoDate: string
): string {
	const periodFormatter = new Intl.DateTimeFormat(
		PERIOD_LOCALE,
		PERIOD_FORMAT_OPTIONS
	);
	const beginningLabel = periodFormatter.format(parseIsoDate(beginningIsoDate));
	const endLabel = periodFormatter.format(parseIsoDate(endIsoDate));
	return `${beginningLabel} – ${endLabel}`;
}
