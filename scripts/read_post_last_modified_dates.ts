import { parse } from 'yaml';
import { z } from 'astro/zod';
import { join } from 'node:path';
import { readdir, readFile } from 'node:fs/promises';

const POSTS_DIRECTORY = 'src/content/posts';
const MARKDOWN_EXTENSION = '.md';
const DRAFT_FILENAME_PREFIX = '_';
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

const postFrontmatterSchema = z.object({
	publishedAt: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	lang: z.enum(['en', 'fr']).default('fr'),
	urlSlug: z.string(),
});

type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

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

async function readAllPostFrontmatters(): Promise<readonly PostFrontmatter[]> {
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

function mostRecent(firstDate: Date, secondDate: Date): Date {
	return firstDate > secondDate ? firstDate : secondDate;
}

/**
 * Maps every article and blog index URL to the date of its newest content, so
 * the sitemap can advertise an honest `lastmod`. Pages without a reliable
 * change signal are deliberately left out.
 */
export async function readPostLastModifiedDates(
	siteUrl: string
): Promise<ReadonlyMap<string, Date>> {
	const frontmatters = await readAllPostFrontmatters();
	const lastModifiedDates = new Map<string, Date>();

	for (const { lang, urlSlug, publishedAt, updatedAt } of frontmatters) {
		const articleUrl = new URL(`/${lang}/blog/${urlSlug}/`, siteUrl).toString();
		const blogIndexUrl = new URL(`/${lang}/blog/`, siteUrl).toString();
		const lastModifiedAt = updatedAt ?? publishedAt;
		const knownIndexDate = lastModifiedDates.get(blogIndexUrl);

		lastModifiedDates.set(articleUrl, lastModifiedAt);
		lastModifiedDates.set(
			blogIndexUrl,
			knownIndexDate === undefined
				? lastModifiedAt
				: mostRecent(knownIndexDate, lastModifiedAt)
		);
	}

	return lastModifiedDates;
}
