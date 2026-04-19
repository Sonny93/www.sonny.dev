import { Link } from '@adonisjs/inertia/react';

import { URLs } from '~/constants/urls';

interface NavigationLinkProps {
	href: string;
	label: string;
}

export const NavigationLinks = () => (
	<div className="flex gap-4">
		{Object.entries(URLs).map(([key, value]) => (
			<NavigationLink href={value} label={key} key={key} />
		))}
	</div>
);

export const NavigationLink = ({ href, label }: NavigationLinkProps) => (
	<Link
		href={href}
		className="text-gray-500 dark:text-gray-400 whitespace-nowrap"
	>
		{label}
	</Link>
);
