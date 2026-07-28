import type { Locale } from '../i18n/ui';

export function resolveOpenGraphImagePath(
	locale: Locale,
	imagePath: string | undefined
): string {
	return imagePath ?? `/og/default-${locale}.png`;
}
