import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { DEFAULT_LOCALE } from '#shared/consts/i18n';
import type { Locale } from '#shared/types/i18n';
import { dynamicActivate } from '~/i18n';
import { DefaultLayout } from '~/layouts/default_layout';

export default async function render(page: any): Promise<unknown> {
	const locale = (page?.props?.locale as Locale | undefined) ?? DEFAULT_LOCALE;
	await dynamicActivate(locale);

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
