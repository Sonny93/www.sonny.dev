import type { Locale } from '../i18n/ui';

const POSTS_IMAGE_DIRECTORY = '/og/posts/';

export function resolveOpenGraphImagePath(
	locale: Locale,
	imagePath: string | undefined
): string {
	return imagePath ?? `/og/default-${locale}.png`;
}

export function postOpenGraphImageName(
	locale: Locale,
	urlSlug: string
): string {
	return `${locale}-${urlSlug}.png`;
}

/**
 * Points a post at its generated card, falling back to the locale default when
 * the card is missing so a post added without running the generator still
 * shares a valid image instead of a broken URL.
 */
export function resolvePostOpenGraphImagePath(
	locale: Locale,
	urlSlug: string,
	generatedImageNames: ReadonlySet<string>
): string | undefined {
	const imageName = postOpenGraphImageName(locale, urlSlug);
	if (!generatedImageNames.has(imageName)) return undefined;
	return `${POSTS_IMAGE_DIRECTORY}${imageName}`;
}
