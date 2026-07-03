import path from 'node:path';
import { existsSync } from 'node:fs';

const PROJECTS_THUMBNAIL_DIRECTORY = path.join(
	process.cwd(),
	'public',
	'projects'
);
const PLACEHOLDER_THUMBNAIL_URL = '/projects/placeholder.svg';

export function resolveProjectThumbnail(thumbnailUrl: string): string {
	const absolutePath = path.join(PROJECTS_THUMBNAIL_DIRECTORY, thumbnailUrl);
	return existsSync(absolutePath)
		? `/projects/${thumbnailUrl}`
		: PLACEHOLDER_THUMBNAIL_URL;
}
