import type { Locale } from '../i18n/ui';

type ProjectContent = {
	readonly description: string;
};

export type Project = {
	readonly name: string;
	readonly languages: readonly string[];
	readonly thumbnailUrl: string;
	readonly url?: string;
	readonly githubUrl?: string;
	readonly content: Record<Locale, ProjectContent>;
};

export const projects: readonly Project[] = [
	{
		name: 'MyLinks',
		languages: ['Adonis', 'Inertia', 'React', 'Tailwind CSS'],
		thumbnailUrl: 'my-links.webp',
		url: 'https://www.mylinks.app/',
		githubUrl: 'https://github.com/my-links/my-links',
		content: {
			fr: {
				description:
					"MyLinks est un outil qui vous permet de gérer vos liens favoris dans une interface intuitive. Projet libre et open source, axé sur la confidentialité et l'auto-hébergement.",
			},
			en: {
				description:
					'MyLinks is a tool for managing your favorite links in an intuitive interface. A free and open-source project focused on privacy and self-hosting.',
			},
		},
	},
	{
		name: 'Installerwindows.fr',
		languages: ['Adonis', 'Inertia', 'React', 'Tailwind CSS'],
		thumbnailUrl: 'installer-windows.webp',
		url: 'https://www.installerwindows.fr/',
		githubUrl: 'https://github.com/Sonny93/installerwindows.fr',
		content: {
			fr: {
				description:
					"Guides pour (ré)installer Windows 11 au propre et faire des optimisations saines pour votre machine. Il s'agit de guides complets, que vous devriez pouvoir suivre quel que soit votre niveau en informatique.",
			},
			en: {
				description:
					'Guides for (re)installing Windows 11 cleanly and applying sane optimizations to your machine. Comprehensive guides you can follow regardless of your technical level.',
			},
		},
	},
	{
		name: 'Takumi',
		url: 'https://takumi.sonnydata.fr/',
		thumbnailUrl: 'takumi.webp',
		languages: ['Adonis', 'Inertia', 'React', 'Tailwind CSS'],
		content: {
			fr: { description: 'UI alternative à Anilist' },
			en: { description: 'Alternative UI for Anilist' },
		},
	},
	{
		name: '@minimalstuff/ui',
		languages: ['TypeScript', 'React', 'Tailwind CSS'],
		thumbnailUrl: '@minimalstuff/ui.webp',
		url: 'https://minimalstuff.github.io/ui',
		githubUrl: 'https://github.com/minimalstuff/ui',
		content: {
			fr: { description: 'UI kit pour mes projets' },
			en: { description: 'UI kit for my projects' },
		},
	},
	{
		name: '@minimalstuff/tooling',
		languages: ['TypeScript', 'OXC', 'oxfmt', 'oxlint'],
		thumbnailUrl: '@minimalstuff/tooling.webp',
		githubUrl: 'https://github.com/minimalstuff/tooling',
		content: {
			fr: { description: 'Configuration OXC pour mes projets' },
			en: { description: 'OXC configuration for my projects' },
		},
	},
	{
		name: '@minimalstuff/waiting',
		languages: ['TypeScript', 'OXC', 'oxfmt', 'oxlint'],
		thumbnailUrl: '@minimalstuff/waiting.webp',
		githubUrl: 'https://github.com/minimalstuff/waiting',
		content: {
			fr: {
				description: 'Attendre que les services externes soient disponibles',
			},
			en: { description: 'Wait for external services to be available' },
		},
	},
];
