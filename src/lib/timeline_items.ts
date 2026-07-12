import type { Locale } from '../i18n/ui';
import { escapeHtml } from './escape_html';
import { formatPeriod } from './format_period';
import type { Formation } from '../data/formations';
import type { Experience } from '../data/experiences';
import type { VerticalTimelineItem } from '../components/timeline/vertical_timeline_item';

function buildExperienceMetaHtml(
	experience: Experience,
	locale: Locale
): string {
	const periodLabel = formatPeriod(
		experience.beginningDate,
		experience.endDate
	);
	const companyLabel = escapeHtml(experience.company);
	const cityLabel = escapeHtml(experience.content[locale].city);
	return `${periodLabel} <span>(<span class="text-white/95">${companyLabel}</span> - ${cityLabel})</span>`;
}

export function buildExperienceTimelineItems(
	experiences: readonly Experience[],
	locale: Locale
): readonly VerticalTimelineItem[] {
	return experiences.map((experience, experienceIndex) => ({
		id: `experience-${experienceIndex}-${experience.beginningDate}`,
		title: experience.content[locale].title,
		titleVariant: 'uppercase' as const,
		metaHtml: buildExperienceMetaHtml(experience, locale),
		bullets: experience.content[locale].description,
	}));
}

function buildFormationMetaHtml(formation: Formation, locale: Locale): string {
	const periodLabel = formatPeriod(formation.beginningDate, formation.endDate);
	const degreeLabel = escapeHtml(formation.content[locale].degree);
	const schoolLabel = escapeHtml(formation.school);
	const cityLabel = escapeHtml(formation.city);
	return `${degreeLabel} · ${periodLabel} <span>(<span class="text-white/95">${schoolLabel}</span> - ${cityLabel})</span>`;
}

export function buildFormationTimelineItems(
	formations: readonly Formation[],
	locale: Locale
): readonly VerticalTimelineItem[] {
	return formations.map((formation, formationIndex) => ({
		id: `formation-${formationIndex}-${formation.beginningDate}`,
		title: formation.content[locale].title,
		metaHtml: buildFormationMetaHtml(formation, locale),
	}));
}
