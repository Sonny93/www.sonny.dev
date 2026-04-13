import vine from '@vinejs/vine';

export const postSchema = vine.object({
	title: vine.string(),
	description: vine.string(),
	tags: vine.array(vine.string()),
	slug: vine.string(),
	content: vine.string(),
	publishedAt: vine.date(),
});
