import vine from '@vinejs/vine';

import { STRUCTURED_DATE_VALIDATOR } from '#lib/date';

export const experienceSchema = vine.object({
	title: vine.string(),
	jobKind: vine.string(),
	description: vine
		.unionOfTypes([vine.string(), vine.array(vine.string())])
		.optional(),
	company: vine.string(),
	city: vine.string(),
	beginningDate: STRUCTURED_DATE_VALIDATOR,
	endDate: STRUCTURED_DATE_VALIDATOR,
});
