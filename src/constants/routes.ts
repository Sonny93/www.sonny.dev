type PostRoutePath = `blog/${string}`;

export const ROUTES = {
	home: '',
	blog: 'blog',
	projects: 'projects',
	post: (slug: string): PostRoutePath => `blog/${slug}`,
} as const;

export type RoutePath = {
	[TRouteName in keyof typeof ROUTES]: (typeof ROUTES)[TRouteName] extends (
		slug: string
	) => infer TGeneratedPath
		? TGeneratedPath
		: (typeof ROUTES)[TRouteName];
}[keyof typeof ROUTES];
