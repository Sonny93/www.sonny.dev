import vine from '@vinejs/vine';

import { STRUCTURED_DATE_VALIDATOR } from '#lib/date';

export const POST_SLUG_PARAM_VALIDATOR = vine.object({
	slug: vine.string(),
});

export const postSchema = vine.object({
	title: vine.string(),
	description: vine.string(),
	tags: vine.array(vine.string()),
	...POST_SLUG_PARAM_VALIDATOR.getProperties(),
	contentPath: vine.string(),
	content: vine.string(),
	publishedAt: STRUCTURED_DATE_VALIDATOR,
});
