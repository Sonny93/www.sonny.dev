import type { Locale } from '../i18n/ui';

type IsoDateString = string;

type FormationContent = {
	readonly title: string;
	readonly degree: string;
};

export type Formation = {
	readonly school: string;
	readonly city: string;
	readonly beginningDate: IsoDateString;
	readonly endDate: IsoDateString;
	readonly content: Record<Locale, FormationContent>;
};

export const formations: readonly Formation[] = [
	{
		school: 'IPSSI',
		city: 'Paris 12e',
		beginningDate: '2023-10-01',
		endDate: '2025-09-30',
		content: {
			fr: {
				title: 'Développement Big Data et Intelligence Artificielle',
				degree: 'Mastère',
			},
			en: {
				title: 'Big Data and Artificial Intelligence Development',
				degree: "Master's degree",
			},
		},
	},
	{
		school: 'IPSSI',
		city: 'Paris 12e',
		beginningDate: '2022-10-01',
		endDate: '2023-09-30',
		content: {
			fr: {
				title: 'Développement Fullstack et DevOps',
				degree: 'Bachelor',
			},
			en: {
				title: 'Fullstack and DevOps Development',
				degree: "Bachelor's degree",
			},
		},
	},
	{
		school: 'Voillaume',
		city: 'Aulnay-Sous-Bois',
		beginningDate: '2020-09-01',
		endDate: '2022-05-31',
		content: {
			fr: {
				title: 'Système Informatique aux Organisations option SLAM',
				degree: 'BTS',
			},
			en: {
				title: 'Organizational IT Systems - SLAM track',
				degree: 'BTS',
			},
		},
	},
	{
		school: 'Voillaume',
		city: 'Aulnay-Sous-Bois',
		beginningDate: '2017-09-01',
		endDate: '2020-06-30',
		content: {
			fr: {
				title: 'Système Numérique option RISC',
				degree: 'BAC',
			},
			en: {
				title: 'Digital Systems - RISC track',
				degree: 'BAC',
			},
		},
	},
];
