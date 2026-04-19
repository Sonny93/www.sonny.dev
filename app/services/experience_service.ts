import { experienceCollection } from '#collections/experience_collection';

export class ExperienceService {
	async getAll() {
		const query = await this.#getQuery();
		return query.all();
	}

	async #getQuery() {
		return experienceCollection.load();
	}
}
