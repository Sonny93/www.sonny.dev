import { Link } from '@adonisjs/inertia/react';
import { ThemeToggle } from '@minimalstuff/ui';
import { Socials } from '~/constants/socials';
import { URLs } from '~/constants/urls';
import { getIcon, SocialIcon } from '~/lib/icons';
import { NavigationLinks } from './navigation_links';

export const Footer = () => (
	<footer className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-2 px-4 rounded-md">
		<p>© 2026 Sonny</p>
		<NavigationLinks />
		<div className="flex min-w-0 items-center justify-end justify-self-end gap-2">
			{Object.entries(Socials).map(([key, value]) => (
				<Link
					href={value}
					key={key}
					target="_blank"
					rel="noreferrer"
					aria-label={key}
				>
					<span
						className={`${getIcon(key as SocialIcon)} text-gray-500 dark:text-gray-400 size-6`}
						aria-hidden
					/>
				</Link>
			))}{' '}
			<ThemeToggle />
		</div>
	</footer>
);
