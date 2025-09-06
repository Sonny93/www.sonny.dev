import presetWebFonts from '@unocss/preset-web-fonts';
import { defineConfig, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Poppins',
      },
    }),
  ],
  theme: {
    colors: {
      adonis: '#5a45ff',
      react: '#017fa5',
      typescript: '#2d79c7',
      node: '#539e43',
    },
  },
});
