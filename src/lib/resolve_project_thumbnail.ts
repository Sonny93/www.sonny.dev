import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PROJECTS_THUMBNAIL_DIRECTORY = fileURLToPath(
	new URL('../../public/projects/', import.meta.url)
);
const PLACEHOLDER_THUMBNAIL_URL = '/projects/placeholder.svg';

export function resolveProjectThumbnail(thumbnailUrl: string): string {
	const absolutePath = `${PROJECTS_THUMBNAIL_DIRECTORY}${thumbnailUrl}`;
	return existsSync(absolutePath)
		? `/projects/${thumbnailUrl}`
		: PLACEHOLDER_THUMBNAIL_URL;
}
