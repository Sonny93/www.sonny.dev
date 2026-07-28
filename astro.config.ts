import unocss from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { DEFAULT_LOCALE, LOCALES } from './src/i18n/ui.js';
import { readPostPublicationDates } from './scripts/read_post_publication_dates.js';

const DEV_SERVER_PORT = 3333;
const DEV_HOST = '0.0.0.0';
const SITE_URL = 'https://www.sonny.dev';
const LOCALE_REDIRECT_PAGE_URL = `${SITE_URL}/`;

const postPublicationDates = await readPostPublicationDates(SITE_URL);

export default defineConfig({
	output: 'static',
	site: SITE_URL,
	server: {
		port: DEV_SERVER_PORT,
		host: DEV_HOST,
	},
	i18n: {
		locales: [...LOCALES],
		defaultLocale: DEFAULT_LOCALE,
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'vitesse-light',
				dark: 'vitesse-dark',
			},
		},
	},
	integrations: [
		unocss(),
		sitemap({
			filter: (pageUrl) => pageUrl !== LOCALE_REDIRECT_PAGE_URL,
			serialize(sitemapItem) {
				const publishedAt = postPublicationDates.get(sitemapItem.url);
				if (publishedAt !== undefined)
					sitemapItem.lastmod = publishedAt.toISOString();
				return sitemapItem;
			},
			i18n: {
				defaultLocale: DEFAULT_LOCALE,
				locales: Object.fromEntries(LOCALES.map((locale) => [locale, locale])),
			},
		}),
	],
});
