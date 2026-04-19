import vine from '@vinejs/vine';

export const projectSchema = vine.object({
	name: vine.string(),
	description: vine.unionOfTypes([vine.string(), vine.array(vine.string())]),
	url: vine.unionOfTypes([vine.string(), vine.null()]),
	thumbnailUrl: vine.string(),
	languages: vine.array(vine.string()),
	githubUrl: vine.string().optional(),
});
