import { posts } from '#collections/posts';

export class PostsService {
	async getLatestPublishedPosts() {
		const query = await this.#getQuery();
		return query.published().slice(0, 3);
	}

	async #getQuery() {
		return posts.load();
	}
}
