import { Link } from '@adonisjs/inertia/react';
import { ThemeToggle } from '@minimalstuff/ui';

type NavbarLink = {
	label: string;
	href: string;
	icon: string;
};

const NAVBAR_LINKS: NavbarLink[] = [] as const;

const AppLogo = () => <div className="h-auto w-30">App Logo</div>;

const NavbarLink = ({ link }: { link: (typeof NAVBAR_LINKS)[number] }) => (
	<Link
		href={link.href}
		className="text-gray-900 dark:text-white flex items-center gap-2"
		key={link.href}
	>
		<i
			className={`${link.icon} text-gray-500 dark:text-gray-400 h-6 min-w-6 block`}
		/>
		{link.label}
	</Link>
);

export const Navbar = () => (
	<nav className="h-[64px] bg-white dark:bg-gray-800 max-w-[1920px] flex justify-between items-center py-2 px-6 rounded-md">
		<div className="flex items-center gap-6">
			<Link
				href="/"
				className="flex-shrink-0 text-2xl text-gray-900 dark:text-white mr-6"
			>
				<AppLogo />
			</Link>
			{NAVBAR_LINKS.map((link) => (
				<NavbarLink key={link.href} link={link} />
			))}
		</div>
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
				Bonjour,
				<span className="text-gray-900 dark:text-white">User Name</span>
			</div>
			<ThemeToggle />
		</div>
	</nav>
);
