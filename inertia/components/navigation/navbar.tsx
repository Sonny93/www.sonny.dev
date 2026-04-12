import { Link } from '@adonisjs/inertia/react';
import { URLs } from '~/constants/urls';
import { NavigationLinks } from './navigation_links';

export const Navbar = () => (
	<nav className="w-full bg-white dark:bg-gray-800 flex justify-center py-2 px-6 rounded-md">
		<NavigationLinks />
	</nav>
);
