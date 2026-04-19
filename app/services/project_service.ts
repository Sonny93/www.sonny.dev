import { projectCollection } from '#collections/project_collection';

export class ProjectService {
	async getAll() {
		const query = await this.#getQuery();
		return query.all();
	}

	async #getQuery() {
		return projectCollection.load();
	}
}
