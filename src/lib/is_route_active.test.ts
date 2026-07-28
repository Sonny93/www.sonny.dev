import { describe, expect, it } from 'vitest';

import { ROUTES } from '../constants/routes';
import { isRouteActive } from './is_route_active';

describe('isRouteActive', () => {
	it('should mark a route active on its own page', () => {
		expect(isRouteActive(ROUTES.blog, '/en/blog/', '/en/blog/')).toBe(true);
	});

	it('should mark a section active on one of its children', () => {
		expect(isRouteActive(ROUTES.blog, '/en/blog/', '/en/blog/homeflix/')).toBe(
			true
		);
	});

	it('should not mark home active on every page', () => {
		expect(isRouteActive(ROUTES.home, '/en/', '/en/blog/')).toBe(false);
	});

	it('should mark home active on the home page itself', () => {
		expect(isRouteActive(ROUTES.home, '/en/', '/en/')).toBe(true);
	});

	it('should ignore a missing trailing slash', () => {
		expect(
			isRouteActive(ROUTES.projects, '/en/projects/', '/en/projects')
		).toBe(true);
	});

	it('should not confuse a route with one that merely shares a prefix', () => {
		expect(isRouteActive(ROUTES.blog, '/en/blog/', '/en/blogroll/')).toBe(
			false
		);
	});

	it('should not mark a route active on another locale', () => {
		expect(isRouteActive(ROUTES.blog, '/en/blog/', '/fr/blog/')).toBe(false);
	});
});
