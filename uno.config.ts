import presetWebFonts from '@unocss/preset-web-fonts';
import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetWind4,
} from 'unocss';

import { socialLinks } from './src/constants/socials.js';

const titleCommonStyles = {
	'font-weight': 'unset',
	'line-height': '1.2',
	'margin-top': '2rem',
};

const markdownTypographyExtend = {
	a: {
		'text-decoration': 'none',
		color: 'var(--colors-blue-400)',
	},
	h1: {
		'font-size': '2rem',
		...titleCommonStyles,
	},
	h2: {
		'font-size': '1.5rem',
		...titleCommonStyles,
	},
	h3: {
		'font-size': '1.25rem',
		...titleCommonStyles,
	},
	h4: {
		'font-size': '1rem',
		...titleCommonStyles,
	},
	h5: {
		'font-size': '0.875rem',
		...titleCommonStyles,
	},
	h6: {
		'font-size': '0.75rem',
		...titleCommonStyles,
	},
	blockquote: {
		'font-size': '0.9375rem',
		'font-weight': 'unset',
		'line-height': '1.65',
	},
	'code::before': {
		content: 'none',
	},
	'code::after': {
		content: 'none',
	},
	':not(pre) > code': {
		padding: '0.25rem 0.375rem',
		'border-radius': '0.25rem',
		'border-width': '1px',
		'border-style': 'solid',
		'border-color': 'var(--un-prose-td-borders)',
		'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
		'white-space': 'nowrap',
	},
	pre: {
		'border-width': '1px',
		'border-style': 'solid',
		'border-color': 'var(--un-prose-td-borders)',
		'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
	},
};

export default defineConfig({
	presets: [
		presetWind4({
			dark: 'class',
		}),
		presetIcons({
			cdn: 'https://esm.sh/',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		presetTypography({
			cssExtend: markdownTypographyExtend,
		}),
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				sans: 'Poppins',
			},
		}),
	],
	safelist: socialLinks.map((socialLink) => socialLink.iconClass),
	shortcuts: {
		'min-h-dvh': 'min-h-[100dvh]',
		'min-h-svh': 'min-h-[100svh]',
		'h-dvh': 'h-[100dvh]',
		'h-svh': 'h-[100svh]',
	},
});
