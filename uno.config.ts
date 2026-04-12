import { defineConfig, presetWind4 } from 'unocss';
import presetWebFonts from '@unocss/preset-web-fonts';

export default defineConfig({
	presets: [
		presetWind4({
			dark: 'class',
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
