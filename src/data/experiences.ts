import dayjs, { Dayjs } from 'dayjs';

enum JobTitle {
  dev = 'Développeur Web',
  adminSys = 'Administrateur Réseau',
}

enum Company {
  AIOS = 'AIOS SH',
  AndAfter = 'And After',
  ACMS = 'ACMS',
  MAC2 = 'Mac2 Webintelligence',
  DAF = 'DAF Truck France',
  G2J = 'Groupe 2J',
}

type JobKind = 'Stagiaire' | 'Alternant';

const descriptionStageAndafter =
  "Mise en place d'offres promotionnelles pour les clients via CMS eCommerce maison";

export type Experience = {
  title: JobTitle;
  descriptions?: string[];
  jobKind: JobKind;
  company: Company;
  city: string;
  beginningDate: Dayjs;
  endDate: Dayjs;
};

const listOfExperience: Experience[] = [
  {
    title: JobTitle.dev,
    jobKind: 'Alternant',
    descriptions: [
      "Développement de projets internes à l'entreprise",
      'Intégrations, tests et déploiement automatique',
      'Agilité / Méthode SCRUM',
    ],
    company: Company.AIOS,
    city: 'Paris 13e',
    beginningDate: dayjs('1 September 2022'),
    endDate: dayjs('5 July 2024'),
  },
  {
    title: JobTitle.dev,
    jobKind: 'Stagiaire',
    descriptions: ["Développement de projets internes à l'entreprise"],
    company: Company.AIOS,
    city: 'Paris 2e',
    beginningDate: dayjs('17 January 2022'),
    endDate: dayjs('11 March 2022'),
  },
  {
    title: JobTitle.dev,
    jobKind: 'Stagiaire',
    descriptions: [descriptionStageAndafter],
    company: Company.AndAfter,
    city: 'Vincennes',
    beginningDate: dayjs('31 May 2021'),
    endDate: dayjs('30 June 2021'),
  },
  {
    title: JobTitle.dev,
    jobKind: 'Stagiaire',
    descriptions: [descriptionStageAndafter],
    company: Company.AndAfter,
    city: 'Vincennes',
    beginningDate: dayjs('18 November 2019'),
    endDate: dayjs('24 January 2020'),
  },
  {
    title: JobTitle.adminSys,
    jobKind: 'Stagiaire',
    descriptions: ['Changement de matériel dans les agences ACMS'],
    company: Company.ACMS,
    city: 'Suresnes',
    beginningDate: dayjs('18 March 2019'),
    endDate: dayjs('24 May 2019'),
  },
  {
    title: JobTitle.dev,
    jobKind: 'Stagiaire',
    descriptions: [
      "Développement d'un petit site internet avec cahier des charges",
    ],
    company: Company.MAC2,
    city: 'Maisons-Alfort',
    beginningDate: dayjs('22 May 2018'),
    endDate: dayjs('29 June 2018'),
  },
  {
    title: JobTitle.adminSys,
    jobKind: 'Stagiaire',
    company: Company.DAF,
    city: 'Villepinte',
    beginningDate: dayjs('27 February 2017'),
    endDate: dayjs('3 March 2017'),
  },
  {
    title: JobTitle.adminSys,
    jobKind: 'Stagiaire',
    company: Company.G2J,
    city: 'Rosny-Sous-Bois',
    beginningDate: dayjs('4 January 2016'),
    endDate: dayjs('8 January 2016'),
  },
  {
    title: JobTitle.adminSys,
    jobKind: 'Stagiaire',
    company: Company.G2J,
    city: 'Rosny-Sous-Bois',
    beginningDate: dayjs('7 December 2015'),
    endDate: dayjs('11 December 2015'),
  },
];

export const EXPERIENCE_ITEM_TO_SHOW = 5;

export const experiences = listOfExperience.slice(0, EXPERIENCE_ITEM_TO_SHOW);
