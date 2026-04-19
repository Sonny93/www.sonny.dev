import vine from '@vinejs/vine';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { PostService } from '#services/post_service';
import { POST_SLUG_PARAM_VALIDATOR } from '#validator/post';
import PostTransformer from '#transformers/post_transformer';

@inject()
export default class ShowPostController {
	#validator = vine.create({
		params: POST_SLUG_PARAM_VALIDATOR,
	});

	constructor(private postService: PostService) {}

	async render({ request, inertia }: HttpContext) {
		const { params } = await request.validateUsing(this.#validator);
		const posts = await this.postService.getPostBySlug(params.slug);
		return inertia.render('posts/show_post', {
			post: PostTransformer.transform(posts),
		});
	}
}
