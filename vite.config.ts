import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import inertia from '@adonisjs/inertia/vite';
import adonisjs from '@adonisjs/vite/client';
import { lingui } from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [
		inertia({ ssr: { enabled: true, entrypoint: 'inertia/ssr.tsx' } }),
		react({
			plugins: [['@lingui/swc-plugin', {}]],
		}),
		lingui(),
		adonisjs({
			entrypoints: ['inertia/app.tsx'],
			reload: ['resources/views/**/*.edge'],
		}),
		UnoCSS(),
	],

	/**
	 * Define aliases for importing modules from
	 * your frontend code
	 */
	resolve: {
		alias: {
			'~/': `${import.meta.dirname}/inertia/`,
			'@generated': `${import.meta.dirname}/.adonisjs/client/`,
		},
	},
});
