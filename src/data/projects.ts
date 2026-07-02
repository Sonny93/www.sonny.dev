export type Project = {
	readonly name: string;
	readonly description: string;
	readonly url: string | null;
	readonly thumbnailUrl: string;
	readonly languages: readonly string[];
	readonly githubUrl?: string;
};

export const projects: readonly Project[] = [
	{
		name: 'My Links',
		description:
			"MyLinks est un outil qui vous permet de gérer vos liens favoris dans une interface intuitive. Projet libre et open source, axé sur la confidentialité et l'auto-hébergement.",
		url: 'https://www.mylinks.app/',
		thumbnailUrl: 'my-links.webp',
		languages: ['Adonis', 'Inertia', 'React', 'Tailwind CSS'],
		githubUrl: 'https://github.com/my-links/my-links',
	},
	{
		name: 'Installerwindows.fr',
		description:
			"Guides pour (ré)installer Windows 10/11 au propre et faire des optimisations saines pour votre machine. Il s'agit de guides complets, que vous devriez pouvoir suivre quel que soit votre niveau en informatique.",
		url: 'https://www.installerwindows.fr/',
		thumbnailUrl: 'installer-windows.webp',
		languages: ['Adonis', 'Inertia', 'React', 'Tailwind CSS'],
		githubUrl: 'https://github.com/Sonny93/installerwindows.fr',
	},
	{
		name: 'Takumi',
		description: 'UI alternative à Anilist',
		url: 'https://takumi.sonnydata.fr/',
		thumbnailUrl: 'takumi.webp',
		languages: ['Adonis', 'Inertia', 'React', 'Tailwind CSS'],
	},
	{
		name: '@minimalstuff/ui',
		description: 'UI kit pour mes projets',
		url: 'https://github.com/minimalstuff/ui',
		thumbnailUrl: '@minimalstuff/ui.webp',
		languages: ['TypeScript', 'React', 'Tailwind CSS'],
	},
	{
		name: '@minimalstuff/tooling',
		description: 'Configuration OXC pour mes projets',
		url: 'https://github.com/minimalstuff/tooling',
		thumbnailUrl: '@minimalstuff/tooling.webp',
		languages: ['TypeScript', 'OXC', 'oxfmt', 'oxlint'],
	},
];
