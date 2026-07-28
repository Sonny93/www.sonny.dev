import { describe, expect, it } from 'vitest';

import { DEFAULT_LOCALE, LOCALES, resolveLocale, useTranslations } from './ui';

describe('resolveLocale', () => {
	it('should keep a supported locale', () => {
		expect(resolveLocale('fr')).toBe('fr');
	});

	it('should fall back to the default locale when undefined', () => {
		expect(resolveLocale(undefined)).toBe(DEFAULT_LOCALE);
	});

	it('should fall back to the default locale for an unsupported language', () => {
		expect(resolveLocale('de')).toBe(DEFAULT_LOCALE);
	});

	it('should not treat a regional tag as its base language', () => {
		expect(resolveLocale('fr-CA')).toBe(DEFAULT_LOCALE);
	});
});

describe('useTranslations', () => {
	it('should return the string of the requested locale', () => {
		expect(useTranslations('fr')('navigation.home')).toBe('Accueil');
	});

	it.each(LOCALES)('should have a non-empty translation in %s', (locale) => {
		expect(useTranslations(locale)('navigation.home')).not.toBe('');
	});

	it('should translate the same key differently across locales', () => {
		expect(useTranslations('fr')('navigation.background')).not.toBe(
			useTranslations('en')('navigation.background')
		);
	});
});
