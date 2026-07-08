import {
	minimalstuffPreset,
	OXFMT_DEFAULT_IGNORE_PATTERNS,
} from '@minimalstuff/tooling/oxc/fmt';

export default minimalstuffPreset({
	ignorePatterns: [...OXFMT_DEFAULT_IGNORE_PATTERNS, '**/*.md'],
});
