import clsx from 'clsx';

import { useHeadroom } from '~/hooks/use_headroom';
import { NavigationLinks } from './navigation_links';

export function Navbar() {
	const pinned = useHeadroom({ fixedAt: 120 });
	const navbarStateClass = pinned
		? 'translate-y-0 opacity-100'
		: '-translate-y-2 pointer-events-none opacity-0';

	return (
		<nav
			className={clsx(
				'sticky top-0 z-[9] flex w-full justify-center rounded-md bg-white px-6 py-2 transition-[transform,opacity] duration-300 ease-out dark:bg-gray-800',
				navbarStateClass
			)}
		>
			<NavigationLinks />
		</nav>
	);
}
