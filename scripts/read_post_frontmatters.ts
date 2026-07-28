import { parse } from 'yaml';
import { z } from 'astro/zod';
import { join } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';

const POSTS_DIRECTORY = 'src/content/posts';
const MARKDOWN_EXTENSION = '.md';
const DRAFT_FILENAME_PREFIX = '_';
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

const postFrontmatterSchema = z.object({
	title: z.string(),
	description: z.string(),
	tags: z.array(z.string()),
	publishedAt: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	lang: z.enum(['en', 'fr']).default('fr'),
	urlSlug: z.string(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

function extractFrontmatter(markdown: string, filePath: string): unknown {
	const frontmatterMatch = markdown.match(FRONTMATTER_PATTERN);
	if (frontmatterMatch === null)
		throw new Error(`Missing frontmatter block in ${filePath}.`);
	return parse(frontmatterMatch[1]);
}

async function readPostFrontmatter(filePath: string): Promise<PostFrontmatter> {
	const markdown = await readFile(filePath, 'utf8');
	return postFrontmatterSchema.parse(extractFrontmatter(markdown, filePath));
}

/**
 * Reads the frontmatter of every published post straight from disk, for build
 * tooling that runs outside Astro and cannot reach `astro:content`. Mirrors the
 * collection glob by skipping underscore-prefixed drafts.
 */
export async function readPostFrontmatters(): Promise<
	readonly PostFrontmatter[]
> {
	const directoryEntries = await readdir(POSTS_DIRECTORY, {
		recursive: true,
		withFileTypes: true,
	});
	const markdownPaths = directoryEntries
		.filter(
			(entry) =>
				entry.isFile() &&
				entry.name.endsWith(MARKDOWN_EXTENSION) &&
				!entry.name.startsWith(DRAFT_FILENAME_PREFIX)
		)
		.map((entry) => join(entry.parentPath, entry.name));

	return Promise.all(markdownPaths.map(readPostFrontmatter));
}
