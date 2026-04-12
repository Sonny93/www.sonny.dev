import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';

import { DefaultLayout } from '~/layouts/default_layout';

export default async function render(page: any) {
	return createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		resolve: (name) => {
			return resolvePageComponent(
				`./pages/${name}.tsx`,
				import.meta.glob('./pages/**/*.tsx', { eager: true }),
				(page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>
			);
		},
		setup: ({ App, props }) => <App {...props} />,
	});
}
