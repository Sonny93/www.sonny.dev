import unocss from 'unocss/astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
	output: 'static',
	site: 'https://www.sonny.dev',
	i18n: {
		locales: ['fr', 'en'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: true,
		},
	},
	integrations: [unocss()],
});
