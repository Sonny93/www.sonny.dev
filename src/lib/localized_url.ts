import { getRelativeLocaleUrl } from 'astro:i18n';

import { LOCALES, type Locale } from '../i18n/ui';
import type { RoutePath } from '../constants/routes';

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(?:${LOCALES.join('|')})(?=/|$)`);

export function localizedUrl(locale: Locale, routePath: RoutePath): string {
	return getRelativeLocaleUrl(locale, routePath);
}

export function switchedLocaleUrl(
	targetLocale: Locale,
	currentPathname: string
): string {
	const pathWithoutLocale = currentPathname
		.replace(LOCALE_PREFIX_PATTERN, '')
		.replace(/^\//, '');

	return getRelativeLocaleUrl(targetLocale, pathWithoutLocale);
}
