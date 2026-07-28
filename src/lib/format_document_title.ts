import { SITE_NAME } from '../constants/site';

const TITLE_SEPARATOR = ' · ';

export function formatDocumentTitle(pageTitle: string): string {
	return `${pageTitle}${TITLE_SEPARATOR}${SITE_NAME}`;
}
