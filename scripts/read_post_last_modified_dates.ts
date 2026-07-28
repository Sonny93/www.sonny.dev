import { readPostFrontmatters } from './read_post_frontmatters.js';

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
	const frontmatters = await readPostFrontmatters();
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
