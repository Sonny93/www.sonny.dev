import unocss from 'unocss/astro';
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
	integrations: [unocss()],
});
