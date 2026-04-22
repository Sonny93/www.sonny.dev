import vine from '@vinejs/vine';
import app from '@adonisjs/core/services/app';
import { Collection } from '@adonisjs/content';
import { loaders } from '@adonisjs/content/loaders';

import { projectSchema } from '#validator/project';

export const projectCollection = new Collection({
	schema: vine.array(projectSchema),
	loader: loaders.jsonLoader(app.makePath('data/projects.json')),
	cache: app.inProduction,
});
