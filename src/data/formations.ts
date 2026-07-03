type IsoDateString = string;

export type Formation = {
	readonly title: string;
	readonly degree: string;
	readonly school: string;
	readonly city: string;
	readonly beginningDate: IsoDateString;
	readonly endDate: IsoDateString;
};

export const formations: readonly Formation[] = [
	{
		title: 'Développement Big Data et Intelligence Artificielle',
		degree: 'Mastère',
		school: 'IPSSI',
		city: 'Paris 12e',
		beginningDate: '2023-10-01',
		endDate: '2025-09-30',
	},
	{
		title: 'Développement Fullstack et DevOps',
		degree: 'Bachelor',
		school: 'IPSSI',
		city: 'Paris 12e',
		beginningDate: '2022-10-01',
		endDate: '2023-09-30',
	},
	{
		title: 'Système Informatique aux Organisations option SLAM',
		degree: 'BTS',
		school: 'Voillaume',
		city: 'Aulnay-Sous-Bois',
		beginningDate: '2020-09-01',
		endDate: '2022-05-31',
	},
	{
		title: 'Système Numérique option RISC',
		degree: 'BAC',
		school: 'Voillaume',
		city: 'Aulnay-Sous-Bois',
		beginningDate: '2017-09-01',
		endDate: '2020-06-30',
	},
];
