import { defineConfig } from 'oxlint';
import { minimalstuffPreset } from '@minimalstuff/tooling/oxc/lint';

export default defineConfig({
	extends: [minimalstuffPreset()],
});
