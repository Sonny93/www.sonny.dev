import { Infer } from '@vinejs/vine/types';
import { BaseTransformer } from '@adonisjs/core/transformers';

import { postSchema } from '#validator/post';
import { dateTimeSerializer } from '#lib/date';

const AVERAGE_READING_SPEED_WPM = 225;

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
			estimatedReadTime: Math.round(
				this.resource.content.split(/\s+/).length / AVERAGE_READING_SPEED_WPM
			),
			publishedAt: dateTimeSerializer(this.resource.publishedAt, 'en'),
		};
	}
}
