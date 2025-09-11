import { i18n } from '@lingui/core';

export const locales = {
	en: 'English',
	fr: 'Français',
} as const;
export type Locale = keyof typeof locales;
export const defaultLocale = 'en';

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: Locale) {
	const { messages } = await import(`../../locales/${locale}/messages.po`);
	i18n.load(locale, messages);
	i18n.activate(locale);
}

/**
 * Persist the chosen locale for later visits
 */
export function persistLocale(locale: Locale) {
	try {
		localStorage.setItem('locale', locale);
	} catch {}
	try {
		document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
	} catch {}
}

/**
 * Read persisted locale from localStorage or cookie
 */
export function readPersistedLocale(): Locale | null {
	try {
		const fromStorage = localStorage.getItem('locale');
		if (fromStorage && fromStorage in locales) return fromStorage as Locale;
	} catch {}
	try {
		const match = document.cookie.match(/(?:^|; )locale=([^;]+)/);
		const value = match ? decodeURIComponent(match[1]) : null;
		if (value && value in locales) return value as Locale;
	} catch {}
	return null;
}

/**
 * Detect browser locale and map to supported locales
 */
export function detectBrowserLocale(): Locale | null {
	if (typeof navigator === 'undefined') return null;
	const candidates: string[] = [];
	const nav = navigator as Navigator & { userLanguage?: string };
	if (Array.isArray(nav.languages)) candidates.push(...nav.languages);
	if (nav.language) candidates.push(nav.language);
	if (nav.userLanguage) candidates.push(nav.userLanguage);

	for (const code of candidates) {
		const normalized = code.toLowerCase();
		const base = normalized.split('-')[0] as keyof typeof locales;
		if (base in locales) return base as Locale;
	}
	return null;
}

/**
 * Get initial locale using persistence, then detection, then default
 */
export function resolveInitialLocale(): Locale {
	return readPersistedLocale() || detectBrowserLocale() || defaultLocale;
}
