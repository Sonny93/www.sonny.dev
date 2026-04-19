import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { PostService } from '#services/post_service';
import PostTransformer from '#transformers/post_transformer';

@inject()
export default class ShowPostsController {
	constructor(private postService: PostService) {}

	async render({ inertia }: HttpContext) {
		const posts = await this.postService.getAllPublishedPosts();
		return inertia.render('posts/show_posts', {
			posts: PostTransformer.transform(posts),
		});
	}
}
