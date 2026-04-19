import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { PostService } from '#services/post_service';
import { ProjectService } from '#services/project_service';
import PostTransformer from '#transformers/post_transformer';
import { ExperienceService } from '#services/experience_service';
import ProjectTransformer from '#transformers/project_transformer';
import ExperienceTransformer from '#transformers/experience_transformer';

@inject()
export default class HomeController {
	constructor(
		private postService: PostService,
		private experienceService: ExperienceService,
		private projectService: ProjectService
	) {}

	async render({ inertia }: HttpContext) {
		const posts = await this.postService.getLatestPublishedPosts();
		const experiences = await this.experienceService.getAll();
		const projects = await this.projectService.getAll();

		return inertia.render('home', {
			posts: PostTransformer.transform(posts),
			experiences: ExperienceTransformer.transform(experiences),
			projects: ProjectTransformer.transform(projects),
		});
	}
}
