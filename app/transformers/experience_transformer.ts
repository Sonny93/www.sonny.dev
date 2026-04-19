import { Infer } from '@vinejs/vine/types';
import { BaseTransformer } from '@adonisjs/core/transformers';

import { experienceSchema } from '#validator/experience';

export default class ExperienceTransformer extends BaseTransformer<
	Infer<typeof experienceSchema>
> {
	toObject() {
		return this.pick(this.resource, [
			'title',
			'jobKind',
			'description',
			'company',
			'city',
			'beginningDate',
			'endDate',
		]);
	}
}
