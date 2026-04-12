import { minimalstuffPreset } from '@minimalstuff/tooling/oxc/fmt';

const preset = minimalstuffPreset();

export default minimalstuffPreset({
	ignorePatterns: [
		...(preset.ignorePatterns ?? []),
		'.adonisjs/**',
		'database/schema.ts',
		'pnpm-*.yaml',
	],
});
