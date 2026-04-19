import { Infer } from '@vinejs/vine/types';
import { BaseTransformer } from '@adonisjs/core/transformers';

import { postSchema } from '#validator/post';
import { dateTimeSerializer } from '#lib/date';

export default class PostTransformer extends BaseTransformer<
	Infer<typeof postSchema>
> {
	toObject() {
		return {
			...this.pick(this.resource, [
				'title',
				'description',
				'tags',
				'slug',
				'content',
			]),
			publishedAt: dateTimeSerializer(this.resource.publishedAt, 'en'),
		};
	}
}
