import { describe, expect, it } from 'vitest';

import type { Formation } from '../data/formations';
import type { Experience } from '../data/experiences';
import {
	buildExperienceTimelineItems,
	buildFormationTimelineItems,
} from './timeline_items';

function buildExperience(overrides: Partial<Experience> = {}): Experience {
	return {
		company: 'Acme',
		beginningDate: '2022-09-01',
		endDate: '2024-06-30',
		content: {
			en: {
				title: 'Full Stack Developer',
				jobKind: 'Apprentice',
				city: 'Paris',
				description: ['Shipped things.'],
			},
			fr: {
				title: 'Développeur Full Stack',
				jobKind: 'Alternant',
				city: 'Paris',
				description: ['A livré des choses.'],
			},
		},
		...overrides,
	};
}

function buildFormation(): Formation {
	return {
		school: 'Acme School',
		city: 'Paris',
		beginningDate: '2020-09-01',
		endDate: '2022-06-30',
		content: {
			en: { title: 'Computer Science', degree: 'BSc' },
			fr: { title: 'Informatique', degree: 'Licence' },
		},
	};
}

describe('buildExperienceTimelineItems', () => {
	it('should use the title of the requested locale', () => {
		const [item] = buildExperienceTimelineItems([buildExperience()], 'fr');

		expect(item.title).toBe('Développeur Full Stack');
	});

	it('should give each entry a distinct id', () => {
		const items = buildExperienceTimelineItems(
			[buildExperience(), buildExperience()],
			'en'
		);

		expect(items[0].id).not.toBe(items[1].id);
	});

	it('should show the period alongside the company', () => {
		const [item] = buildExperienceTimelineItems([buildExperience()], 'en');

		expect(item.metaHtml).toMatch(/^\w+ 2022 - \w+ 2024/);
	});

	it('should escape company markup so data cannot inject html', () => {
		const experience = buildExperience({ company: '<img onerror=x>' });
		const [item] = buildExperienceTimelineItems([experience], 'en');

		expect(item.metaHtml).not.toContain('<img');
	});

	it('should keep the description as the entry bullets', () => {
		const [item] = buildExperienceTimelineItems([buildExperience()], 'en');

		expect(item.bullets).toEqual(['Shipped things.']);
	});
});

describe('buildFormationTimelineItems', () => {
	it('should use the title of the requested locale', () => {
		const [item] = buildFormationTimelineItems([buildFormation()], 'en');

		expect(item.title).toBe('Computer Science');
	});

	it('should show the degree of the requested locale', () => {
		const [item] = buildFormationTimelineItems([buildFormation()], 'fr');

		expect(item.metaHtml).toContain('Licence');
	});

	it('should return nothing for an empty list', () => {
		expect(buildFormationTimelineItems([], 'en')).toEqual([]);
	});
});
