import { Socials } from '~/constants/socials';

export type SocialIcon = keyof typeof Socials;

export function getIcon(name: SocialIcon) {
	switch (name) {
		case 'linkedin':
			return 'i-mdi-linkedin';
		case 'github':
			return 'i-mdi-github';
		case 'discord':
			return 'i-mdi-discord';
	}
}
