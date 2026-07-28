import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { ROUTES } from '../../constants/routes';
import { getPublishedPosts } from '../../lib/posts';
import { localizedUrl } from '../../lib/localized_url';
import { formatDocumentTitle } from '../../lib/format_document_title';
import { LOCALES, resolveLocale, useTranslations } from '../../i18n/ui';

export function getStaticPaths() {
	return LOCALES.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext): Promise<Response> {
	if (context.site === undefined)
		throw new Error('Cannot build the RSS feed without a configured `site`.');

	const locale = resolveLocale(context.params.locale);
	const translate = useTranslations(locale);
	const posts = await getPublishedPosts(locale);

	return rss({
		title: formatDocumentTitle(translate('blog.pageTitle')),
		description: translate('blog.pageDescription'),
		site: new URL(localizedUrl(locale, ROUTES.blog), context.site),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedAt,
			link: localizedUrl(locale, ROUTES.post(post.data.urlSlug)),
			categories: [...post.data.tags],
		})),
		customData: `<language>${locale}</language>`,
	});
}
