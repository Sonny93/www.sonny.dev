import { Degree } from '#shared/types/index';

const frDegrees: Degree[] = [
	{ name: 'bac', message: 'Baccalauréat' },
	{
		name: 'bts',
		message: 'Brevet de technicien supérieur (BTS)',
	},
	{ name: 'bachelor', message: 'Bachelor' },
	{ name: 'mastere', message: 'Mastère' },
];

const enDegrees: Degree[] = [
	{ name: 'bac', message: 'High School Diploma (Baccalauréat)' },
	{
		name: 'bts',
		message: 'Advanced Technician Certificate (BTS)',
	},
	{ name: 'bachelor', message: "Bachelor's degree" },
	{ name: 'mastere', message: "Master's degree" },
];

function getEnDegree(degreeName: string) {
	return enDegrees.find((degree) => degree.name === degreeName);
}

export { enDegrees, frDegrees, getEnDegree };
