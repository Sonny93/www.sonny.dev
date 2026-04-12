import { defineConfig } from 'oxlint';
import { minimalstuffPreset } from '@minimalstuff/tooling/oxc/lint';

export default defineConfig({
	ignorePatterns: ['.adonisjs/**'],
	extends: [
		minimalstuffPreset({
			adonisjs: true,
			perfectionist: true,
			react: true,
		}),
	],
});
