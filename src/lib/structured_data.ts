import type { Locale } from '../i18n/ui';
import { SITE_NAME } from '../constants/site';
import { socialLinks } from '../constants/socials';

export type JsonLdSchema = Readonly<Record<string, unknown>>;

const SCHEMA_CONTEXT = 'https://schema.org';
const PERSON_ANCHOR = '#person';
const WEBSITE_ANCHOR = '#website';
const FIRST_BREADCRUMB_POSITION = 1;

function buildPersonId(siteUrl: URL): string {
	return new URL(PERSON_ANCHOR, siteUrl).toString();
}

function buildWebSiteId(siteUrl: URL): string {
	return new URL(WEBSITE_ANCHOR, siteUrl).toString();
}

type HomeSchemaParams = {
	readonly siteUrl: URL;
	readonly homeUrl: string;
	readonly jobTitle: string;
	readonly description: string;
	readonly locale: Locale;
};

export function buildHomeSchema({
	siteUrl,
	homeUrl,
	jobTitle,
	description,
	locale,
}: HomeSchemaParams): JsonLdSchema {
	const personId = buildPersonId(siteUrl);
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: SITE_NAME,
				url: homeUrl,
				jobTitle,
				description,
				sameAs: socialLinks.map((socialLink) => socialLink.url),
			},
			{
				'@type': 'WebSite',
				'@id': buildWebSiteId(siteUrl),
				name: SITE_NAME,
				url: homeUrl,
				inLanguage: locale,
				publisher: { '@id': personId },
			},
		],
	};
}

type ArticleSchemaParams = {
	readonly siteUrl: URL;
	readonly articleUrl: string;
	readonly headline: string;
	readonly description: string;
	readonly publishedAt: Date;
	readonly updatedAt: Date | undefined;
	readonly tags: readonly string[];
	readonly imageUrl: string;
	readonly locale: Locale;
};

export function buildArticleSchema({
	siteUrl,
	articleUrl,
	headline,
	description,
	publishedAt,
	updatedAt,
	tags,
	imageUrl,
	locale,
}: ArticleSchemaParams): JsonLdSchema {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'BlogPosting',
		'@id': articleUrl,
		mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
		headline,
		description,
		datePublished: publishedAt.toISOString(),
		dateModified: (updatedAt ?? publishedAt).toISOString(),
		inLanguage: locale,
		keywords: tags,
		image: imageUrl,
		author: {
			'@type': 'Person',
			'@id': buildPersonId(siteUrl),
			name: SITE_NAME,
		},
	};
}

export type BreadcrumbTrailItem =
	| { readonly kind: 'ancestor'; readonly name: string; readonly url: string }
	| { readonly kind: 'current'; readonly name: string };

function buildBreadcrumbItem(
	trailItem: BreadcrumbTrailItem,
	index: number,
	siteUrl: URL
): JsonLdSchema {
	const position = index + FIRST_BREADCRUMB_POSITION;
	if (trailItem.kind === 'current')
		return { '@type': 'ListItem', position, name: trailItem.name };
	return {
		'@type': 'ListItem',
		position,
		name: trailItem.name,
		item: new URL(trailItem.url, siteUrl).toString(),
	};
}

export function buildBreadcrumbSchema(
	trail: readonly BreadcrumbTrailItem[],
	siteUrl: URL
): JsonLdSchema {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((trailItem, index) =>
			buildBreadcrumbItem(trailItem, index, siteUrl)
		),
	};
}
