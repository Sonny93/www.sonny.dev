import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

const md = MarkdownIt();

md.use(
	await Shiki({
		themes: {
			light: 'vitesse-light',
			dark: 'vitesse-dark',
		},
	})
);

export { md };
