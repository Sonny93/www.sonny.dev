import { Infer } from '@vinejs/vine/types';
import { BaseTransformer } from '@adonisjs/core/transformers';

import { projectSchema } from '#validator/project';

export default class ProjectTransformer extends BaseTransformer<
	Infer<typeof projectSchema>
> {
	toObject() {
		return this.pick(this.resource, [
			'name',
			'description',
			'url',
			'thumbnailUrl',
			'languages',
			'githubUrl',
		]);
	}
}
