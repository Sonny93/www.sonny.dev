import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig, presetIcons, presetWind4 } from 'unocss';

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
		presetWebFonts({
			provider: 'bunny',
			fonts: {
				sans: 'Poppins',
			},
		}),
	],
	shortcuts: {
		'min-h-dvh': 'min-h-[100dvh]',
		'min-h-svh': 'min-h-[100svh]',
		'h-dvh': 'h-[100dvh]',
		'h-svh': 'h-[100svh]',
	},
});
