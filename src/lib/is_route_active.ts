import { ROUTES, type RoutePath } from '../constants/routes';

export function withoutTrailingSlash(pathname: string): string {
	return pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
}

export function isRouteActive(
	routePath: RoutePath,
	href: string,
	currentPathname: string
): boolean {
	const normalizedHref = withoutTrailingSlash(href);
	const normalizedCurrentPathname = withoutTrailingSlash(currentPathname);
	if (normalizedCurrentPathname === normalizedHref) return true;
	if (routePath === ROUTES.home) return false;
	return normalizedCurrentPathname.startsWith(`${normalizedHref}/`);
}
