import { postCollection } from '#collections/post_collection';

export class PostService {
	async getLatestPublishedPosts() {
		const query = await this.#getQuery();
		return query.published().slice(0, 3);
	}

	async #getQuery() {
		return postCollection.load();
	}
}
