import unocss from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { DEFAULT_LOCALE, LOCALES } from './src/i18n/ui.js';

const DEV_SERVER_PORT = 3333;
const DEV_HOST = '0.0.0.0';
const SITE_URL = 'https://www.sonny.dev';
const LOCALE_REDIRECT_PAGE_URL = `${SITE_URL}/`;

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
			i18n: {
				defaultLocale: DEFAULT_LOCALE,
				locales: Object.fromEntries(LOCALES.map((locale) => [locale, locale])),
			},
		}),
	],
});
