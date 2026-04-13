import { PostsService } from '#services/posts_service';
import PostTransformer from '#transformers/post_transformer';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class HomeController {
	constructor(private postsService: PostsService) {}

	async render({ inertia }: HttpContext) {
		const posts = await this.postsService.getLatestPublishedPosts();
		return inertia.render('home', {
			posts: PostTransformer.transform(posts),
		});
	}
}
