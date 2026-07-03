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
	'home.headline':
		'I build reliable web platforms and developer-focused systems.',
	'home.introduction':
		"Hi, I'm Sonny. I design and ship maintainable products with clear architecture, thoughtful DX, and practical automation.",
	'home.skillFullStack': 'Full-stack engineering and DevOps',
	'home.skillAutomation': 'Automation-first mindset',
	'home.skillTooling': 'Productive tooling across domains',
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
			'Je construis des plateformes web fiables et des systèmes axés sur les développeurs.',
		'home.introduction':
			'Bonjour, je suis Sonny. Je conçois et livre des produits maintenables avec une architecture claire, une expérience développeur réfléchie et une automatisation pratique.',
		'home.skillFullStack': 'Ingénierie full-stack et DevOps',
		'home.skillAutomation': "Esprit axé sur l'automatisation",
		'home.skillTooling': 'Outils productifs à travers les domaines',
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
