const DATE_MED_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
};

export function formatPublishedDate(date: Date, locale: string): string {
	return new Intl.DateTimeFormat(locale, DATE_MED_FORMAT_OPTIONS).format(date);
}
