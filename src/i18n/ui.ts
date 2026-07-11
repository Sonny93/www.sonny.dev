export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

const EN_UI_STRINGS = {
	'navigation.home': 'Home',
	'navigation.blog': 'Blog',
	'navigation.projects': 'Projects',
	'navigation.background': 'Background',
	'navigation.skipToContent': 'Skip to content',
	'navigation.openMenu': 'Open menu',
	'navigation.closeMenu': 'Close menu',
	'locale.switchToEnglish': 'Switch to English',
	'locale.switchToFrench': 'Switch to French',
	'home.pageTitle': 'Homepage',
	'home.availability': 'Based in France · Open to remote opportunities',
	'home.headline':
		'I engineer resilient web platforms and automate everything else.',
	'home.introduction':
		"Hi, I'm Sonny. Rigorous architecture, clean developer experience, and systems built to run unattended in production.",
	'home.skillFullStack': 'Full-stack engineering and DevOps',
	'home.skillAutomation': 'Automation-first mindset',
	'home.skillHomelab': 'Homelab tinkering and self-hosting',
	'home.readLatestPosts': 'Read my latest posts',
	'home.latestArticles': 'Latest articles',
	'home.viewAllArticles': 'View all articles',
	'home.experiences': 'Experiences',
	'home.formations': 'Education',
	'home.viewFullBackground': 'View full background',
	'home.featuredProjects': 'Featured projects',
	'home.viewAllProjects': 'View all projects',
	'background.pageTitle': 'Background',
	'background.pageDescription':
		"Sonny's professional experience and education background.",
	'blog.pageTitle': 'Blog articles',
	'blog.pageDescription':
		'Articles on full-stack engineering, DevOps, and self-hosting by Sonny.',
	'projects.pageTitle': 'Projects',
	'projects.pageDescription':
		'A selection of projects built by Sonny, from open-source tools to production apps.',
	'projects.viewLiveSite': 'View live site',
	'projects.noLiveDemo': 'No live demo',
	'projects.viewSourceCode': 'View source code',
	'projects.noSourceCode': 'No source code available',
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
		'navigation.background': 'Parcours',
		'navigation.skipToContent': 'Aller au contenu',
		'navigation.openMenu': 'Ouvrir le menu',
		'navigation.closeMenu': 'Fermer le menu',
		'locale.switchToEnglish': 'Passer en anglais',
		'locale.switchToFrench': 'Passer en français',
		'home.pageTitle': "Page d'accueil",
		'home.availability': 'Basé en France · Ouvert aux opportunités à distance',
		'home.headline':
			"Je conçois des plateformes web robustes et j'automatise tout ce qui peut l'être.",
		'home.introduction':
			'Bonjour, je suis Sonny. Architecture rigoureuse, expérience développeur soignée, et des systèmes conçus pour tourner de façon autonome en production.',
		'home.skillFullStack': 'Ingénierie full-stack et DevOps',
		'home.skillAutomation': "Esprit axé sur l'automatisation",
		'home.skillHomelab': 'Bidouille homelab et auto-hébergement',
		'home.readLatestPosts': 'Lire mes derniers articles',
		'home.latestArticles': 'Derniers articles',
		'home.viewAllArticles': 'Voir tous les articles',
		'home.experiences': 'Expériences',
		'home.formations': 'Formations',
		'home.viewFullBackground': 'Voir tout mon parcours',
		'home.featuredProjects': 'Projets phares',
		'home.viewAllProjects': 'Voir tous les projets',
		'background.pageTitle': 'Parcours',
		'background.pageDescription':
			'Le parcours professionnel et la formation de Sonny.',
		'blog.pageTitle': 'Articles de blog',
		'blog.pageDescription':
			"Articles sur l'ingénierie full-stack, le DevOps et l'auto-hébergement, par Sonny.",
		'projects.pageTitle': 'Projets',
		'projects.pageDescription':
			'Une sélection de projets réalisés par Sonny, entre outils open source et applications en production.',
		'projects.viewLiveSite': 'Voir le site',
		'projects.noLiveDemo': 'Pas de démo',
		'projects.viewSourceCode': 'Voir le code source',
		'projects.noSourceCode': 'Code source indisponible',
		'post.readTimeUnit': 'min de lecture',
		'notFound.title': 'Page non trouvée',
		'notFound.description': "Cette page n'existe pas.",
	},
} as const satisfies Readonly<Record<Locale, UiStrings>>;

function isLocale(candidate: string): candidate is Locale {
	return LOCALES.some((locale) => locale === candidate);
}

export function resolveLocale(candidate: string | undefined): Locale {
	if (candidate !== undefined && isLocale(candidate)) return candidate;
	return DEFAULT_LOCALE;
}

export function useTranslations(locale: Locale): (key: UiStringKey) => string {
	return (key) => UI_STRINGS[locale][key];
}
