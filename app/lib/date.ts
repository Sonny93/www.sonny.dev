import vine from '@vinejs/vine';
import { DateTime } from 'luxon';

export const dateTimeSerializer = (
	value: DateTime | null,
	locale: 'fr' | 'en'
) => (value ? value.setLocale(locale).toLocaleString(DateTime.DATE_MED) : null);

export const STRUCTURED_DATE_FORMAT = 'YYYY-MM-DD';
export const STRUCTURED_DATE_VALIDATOR = vine.date({
	formats: [STRUCTURED_DATE_FORMAT],
});
