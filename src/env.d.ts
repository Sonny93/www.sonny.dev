declare module '*.astro' {
	const Component: import('astro/runtime/server/index.js').AstroComponentFactory;
	export default Component;
}
