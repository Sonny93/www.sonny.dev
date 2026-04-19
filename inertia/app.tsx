import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';

import { dynamicActivate } from '~/i18n';
import type { Locale } from '#shared/types/i18n';
import { DEFAULT_LOCALE } from '#shared/consts/i18n';
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

	async setup({ el, App, props }) {
		const locale =
			(props.initialPage.props as { locale?: Locale }).locale ?? DEFAULT_LOCALE;
		await dynamicActivate(locale);
		hydrateRoot(el, <App {...props} />);
	},
});
