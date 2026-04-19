import { postCollection } from '#collections/post_collection';

export class PostService {
	async getLatestPublishedPosts() {
		const query = await this.#getQuery();
		return query.published().slice(0, 3);
	}

	async getAllPublishedPosts() {
		const query = await this.#getQuery();
		return query.published();
	}

	async getPostBySlug(slug: string) {
		const query = await this.#getQuery();
		const post = await query.findBySlug(slug);
		if (!post) {
			throw new Error('Post not found');
		}

		return post;
	}

	async #getQuery() {
		return postCollection.load();
	}
}
