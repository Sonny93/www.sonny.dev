import { postSchema } from '#validator/post';
import { BaseTransformer } from '@adonisjs/core/transformers';
import { Infer } from '@vinejs/vine/types';

export default class PostTransformer extends BaseTransformer<
	Infer<typeof postSchema>
> {
	toObject() {
		return this.pick(this.resource, [
			'title',
			'description',
			'tags',
			'slug',
			'content',
			'publishedAt',
		]);
	}
}
