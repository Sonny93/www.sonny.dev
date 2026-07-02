import unocss from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { DEFAULT_LOCALE, LOCALES } from './src/i18n/ui.js';

export default defineConfig({
	output: 'static',
	site: 'https://www.sonny.dev',
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
			i18n: {
				defaultLocale: DEFAULT_LOCALE,
				locales: Object.fromEntries(LOCALES.map((locale) => [locale, locale])),
			},
		}),
	],
});
