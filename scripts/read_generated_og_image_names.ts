import { readdir } from 'node:fs/promises';

const GENERATED_IMAGES_DIRECTORY = 'public/og/posts';
const PNG_EXTENSION = '.png';

/**
 * Lists the OpenGraph cards currently on disk. Returns an empty set when the
 * directory does not exist yet, so a fresh clone builds before the generator
 * has ever run.
 */
export async function readGeneratedOgImageNames(): Promise<
	ReadonlySet<string>
> {
	try {
		const fileNames = await readdir(GENERATED_IMAGES_DIRECTORY);
		return new Set(fileNames.filter((name) => name.endsWith(PNG_EXTENSION)));
	} catch {
		return new Set();
	}
}
