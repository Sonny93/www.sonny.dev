type IsoDateString = string;

export type Experience = {
	readonly title: string;
	readonly jobKind: string;
	readonly description: readonly string[];
	readonly company: string;
	readonly city: string;
	readonly beginningDate: IsoDateString;
	readonly endDate: IsoDateString;
};

export const experiences: readonly Experience[] = [
	{
		title: 'Développeur Full Stack',
		jobKind: 'Alternant',
		description: [
			'Contribution à la migration de fonctionnalités de Firebase / Express vers Nest.js / PostgreSQL.',
			"Travail dans le cadre d'une architecture hexagonale déjà mise en place, en veillant à respecter ses principes et bonnes pratiques.",
			'Développement fullstack orienté qualité, modularité et évolutivité.',
		],
		company: 'Ville de Paris',
		city: 'Paris · Hybride',
		beginningDate: '2024-10-01',
		endDate: '2025-08-31',
	},
	{
		title: 'Développeur Web',
		jobKind: 'Alternant',
		description: [
			'Développement fullstack (Kotlin côté backend, React / TypeScript / Mantine côté frontend) en alternance.',
			'Participation aux activités DevOps, avec une infrastructure basée sur Kubernetes.',
			'Contribution au développement et à la maintenance d’applications internes de l’entreprise, avec un focus sur fiabilité et évolutivité.',
		],
		company: 'AIOS SH',
		city: 'Paris · Hybride',
		beginningDate: '2022-09-01',
		endDate: '2024-07-05',
	},
];
