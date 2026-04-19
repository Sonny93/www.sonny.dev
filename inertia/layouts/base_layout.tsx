import '@minimalstuff/ui/style.css';
import 'virtual:uno.css';
import '~/css/app.css';

import React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { TuyauProvider } from '@adonisjs/inertia/react';

import { tuyauClient } from '~/lib/tuyau';
import { usePageTransition } from '~/hooks/use_page_transition';

export function BaseLayout({ children }: Readonly<React.PropsWithChildren>) {
	usePageTransition({
		querySelector: '[data-page-transition]',
	});

	return (
		<TuyauProvider client={tuyauClient}>
			<I18nProvider i18n={i18n}>{children}</I18nProvider>
		</TuyauProvider>
	);
}
