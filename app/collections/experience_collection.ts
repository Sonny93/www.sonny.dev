import vine from '@vinejs/vine';
import app from '@adonisjs/core/services/app';
import { Collection } from '@adonisjs/content';
import { loaders } from '@adonisjs/content/loaders';

import { experienceSchema } from '#validator/experience';

export const experienceCollection = new Collection({
	schema: vine.array(experienceSchema),
	loader: loaders.jsonLoader(app.makePath('data/experiences.json')),
	cache: true,
});
