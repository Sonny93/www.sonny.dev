import vine from '@vinejs/vine';

import { STRUCTURED_DATE_VALIDATOR } from '#lib/date';

export const postSchema = vine.object({
	title: vine.string(),
	description: vine.string(),
	tags: vine.array(vine.string()),
	slug: vine.string(),
	content: vine.string(),
	publishedAt: STRUCTURED_DATE_VALIDATOR,
});
