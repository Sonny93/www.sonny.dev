export type SocialLink = {
	readonly name: string;
	readonly url: string;
	readonly iconClass: string;
};

export const socialLinks: readonly SocialLink[] = [
	{
		name: 'github',
		url: 'https://github.com/sonny93',
		iconClass: 'i-mdi-github',
	},
	{
		name: 'linkedin',
		url: 'https://www.linkedin.com/in/sonnylallier/',
		iconClass: 'i-mdi-linkedin',
	},
	{
		name: 'discord',
		url: 'https://discordapp.com/users/257285655388880896',
		iconClass: 'i-mdi-discord',
	},
];
