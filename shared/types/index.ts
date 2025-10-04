export type Degree = {
	name: string;
	message: string;
};

type Formation = {
	degreeType: string;
	degreeName: string;
	result?: string;
	location?: string;
	schoolName: string;
	startDate: string;
	endDate?: string;
	url?: string;
};

export type { Formation };
