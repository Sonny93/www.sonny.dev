import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';

import { DefaultLayout } from '~/layouts/default_layout';

const PROJECT_NAME = 'App';

createInertiaApp({
	progress: { color: 'var(--colors-blue-500)', delay: 50 },

	title: (title) => (title && `${title} — `) + PROJECT_NAME,

	resolve: async (name) => {
		return resolvePageComponent(
			`./pages/${name}.tsx`,
			import.meta.glob('./pages/**/*.tsx'),
			(page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>
		);
	},

	setup({ el, App, props }) {
		hydrateRoot(el, <App {...props} />);
	},
});
