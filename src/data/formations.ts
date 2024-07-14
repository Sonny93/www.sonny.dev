import dayjs, { Dayjs } from 'dayjs';

type Degree = 'BAC' | 'BTS' | 'Bachelor' | 'Mastère';
type School = 'IPSSI' | 'Voillaume';

export type Formation = {
  title: string;
  degree: Degree;
  school: School;
  distinction?: string;
  city: string;
  beginningDate: Dayjs;
  endDate: Dayjs;
};

export const formations: Omit<Formation, 'duration'>[] = [
  {
    title: 'Développement Big Data et Intelligence Artificielle',
    degree: 'Mastère',
    school: 'IPSSI',
    beginningDate: dayjs('Oct. 2023'),
    endDate: dayjs('Sept. 2025'),
    city: 'Paris 12e',
  },
  {
    title: 'Développement Fullstack et DevOps',
    degree: 'Bachelor',
    school: 'IPSSI',
    distinction: 'major de promo',
    beginningDate: dayjs('Oct. 2022'),
    endDate: dayjs('Sept. 2023'),
    city: 'Paris 12e',
  },
  {
    title: 'Système Informatique aux Organisations <b>option</b> SLAM',
    degree: 'BTS',
    school: 'Voillaume',
    beginningDate: dayjs('Sep. 2020'),
    endDate: dayjs('Mai 2022'),
    city: 'Aulnay-Sous-Bois',
  },
  {
    title: 'Système Numérique <b>option</b> RISC',
    degree: 'BAC',
    school: 'Voillaume',
    distinction: 'mention très bien',
    beginningDate: dayjs('Sep. 2017'),
    endDate: dayjs('Juin 2020'),
    city: 'Aulnay-Sous-Bois',
  },
];

export const FORMATION_ITEM_TO_SHOW = formations.length;
