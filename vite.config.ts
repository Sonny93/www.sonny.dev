import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inertia from '@adonisjs/inertia/vite';
import adonisjs from '@adonisjs/vite/client';

export default defineConfig({
	plugins: [
		inertia({ ssr: { enabled: true, entrypoint: 'inertia/ssr.tsx' } }),
		react(),
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
