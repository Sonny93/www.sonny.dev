export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

const EN_UI_STRINGS = {
	'navigation.home': 'Home',
	'navigation.blog': 'Blog',
	'navigation.projects': 'Projects',
	'navigation.skipToContent': 'Skip to content',
	'navigation.openMenu': 'Open menu',
	'navigation.closeMenu': 'Close menu',
	'locale.switchToEnglish': 'Switch to English',
	'locale.switchToFrench': 'Switch to French',
	'home.pageTitle': 'Homepage',
	'home.availability': 'Based in France · Open to remote opportunities',
	'home.headline': 'I build web platforms — then automate everything else.',
	'home.introduction':
		"Hi, I'm Sonny. Clear architecture, sane developer experience, and systems that don't need babysitting after ship.",
	'home.skillFullStack': 'Full-stack engineering and DevOps',
	'home.skillAutomation': 'Automation-first mindset',
	'home.skillHomelab': 'Homelab tinkering and self-hosting',
	'home.readLatestPosts': 'Read my latest posts',
	'home.latestArticles': 'Latest articles',
	'home.viewAllArticles': 'View all articles',
	'home.experiences': 'Experiences',
	'blog.pageTitle': 'Blog articles',
	'post.readTimeUnit': 'min read',
	'notFound.title': 'Page not found',
	'notFound.description': 'This page does not exist.',
} as const;

export type UiStringKey = keyof typeof EN_UI_STRINGS;

type UiStrings = Readonly<Record<UiStringKey, string>>;

const UI_STRINGS = {
	en: EN_UI_STRINGS,
	fr: {
		'navigation.home': 'Accueil',
		'navigation.blog': 'Blog',
		'navigation.projects': 'Projets',
		'navigation.skipToContent': 'Aller au contenu',
		'navigation.openMenu': 'Ouvrir le menu',
		'navigation.closeMenu': 'Fermer le menu',
		'locale.switchToEnglish': 'Passer en anglais',
		'locale.switchToFrench': 'Passer en français',
		'home.pageTitle': "Page d'accueil",
		'home.availability': 'Basé en France · Ouvert aux opportunités à distance',
		'home.headline':
			"Je construis des plateformes web — et j'automatise le reste.",
		'home.introduction':
			"Bonjour, je suis Sonny. Architecture claire, expérience développeur soignée, et des systèmes qui n'ont pas besoin d'être maternés après la mise en prod.",
		'home.skillFullStack': 'Ingénierie full-stack et DevOps',
		'home.skillAutomation': "Esprit axé sur l'automatisation",
		'home.skillHomelab': 'Bidouille homelab et auto-hébergement',
		'home.readLatestPosts': 'Lire mes derniers articles',
		'home.latestArticles': 'Derniers articles',
		'home.viewAllArticles': 'Voir tous les articles',
		'home.experiences': 'Expériences',
		'blog.pageTitle': 'Articles de blog',
		'post.readTimeUnit': 'min de lecture',
		'notFound.title': 'Page non trouvée',
		'notFound.description': "Cette page n'existe pas.",
	},
} as const satisfies Readonly<Record<Locale, UiStrings>>;

export function isLocale(candidate: string): candidate is Locale {
	return LOCALES.some((locale) => locale === candidate);
}

export function resolveLocale(candidate: string | undefined): Locale {
	if (candidate !== undefined && isLocale(candidate)) return candidate;
	return DEFAULT_LOCALE;
}

export function useTranslations(locale: Locale): (key: UiStringKey) => string {
	return (key) => UI_STRINGS[locale][key];
}
