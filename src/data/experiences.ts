import type { Locale } from '../i18n/ui';

type IsoDateString = string;

type ExperienceContent = {
	readonly title: string;
	readonly jobKind: string;
	readonly city: string;
	readonly description: readonly string[];
};

export type Experience = {
	readonly company: string;
	readonly beginningDate: IsoDateString;
	readonly endDate: IsoDateString;
	readonly content: Record<Locale, ExperienceContent>;
};

export const experiences: readonly Experience[] = [
	{
		company: 'Ville de Paris',
		beginningDate: '2024-10-01',
		endDate: '2025-08-31',
		content: {
			fr: {
				title: 'Développeur Full Stack',
				jobKind: 'Alternant',
				city: 'Paris · Hybride',
				description: [
					'Contribution à la migration de fonctionnalités de Firebase / Express vers Nest.js / PostgreSQL.',
					"Travail dans le cadre d'une architecture hexagonale déjà mise en place, en veillant à respecter ses principes et bonnes pratiques.",
					'Développement fullstack orienté qualité, modularité et évolutivité.',
				],
			},
			en: {
				title: 'Full Stack Developer',
				jobKind: 'Apprentice',
				city: 'Paris · Hybrid',
				description: [
					'Contributed to migrating features from Firebase / Express to Nest.js / PostgreSQL.',
					'Worked within an existing hexagonal architecture, following its principles and best practices.',
					'Full-stack development focused on quality, modularity, and scalability.',
				],
			},
		},
	},
	{
		company: 'AIOS SH',
		beginningDate: '2022-09-01',
		endDate: '2024-07-05',
		content: {
			fr: {
				title: 'Développeur Web',
				jobKind: 'Alternant',
				city: 'Paris · Hybride',
				description: [
					'Développement fullstack (Kotlin côté backend, React / TypeScript / Mantine côté frontend) en alternance.',
					'Participation aux activités DevOps, avec une infrastructure basée sur Kubernetes.',
					'Contribution au développement et à la maintenance d’applications internes de l’entreprise, avec un focus sur fiabilité et évolutivité.',
				],
			},
			en: {
				title: 'Web Developer',
				jobKind: 'Apprentice',
				city: 'Paris · Hybrid',
				description: [
					'Full-stack development (Kotlin backend, React / TypeScript / Mantine frontend) as part of a work-study program.',
					'Contributed to DevOps activities on a Kubernetes-based infrastructure.',
					'Built and maintained internal company applications, with a focus on reliability and scalability.',
				],
			},
		},
	},
];
