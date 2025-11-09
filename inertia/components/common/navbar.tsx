import { Link } from '@inertiajs/react';
import { Trans } from '@lingui/react/macro';
import { LocaleSelector } from '~/components/common/locale_selector';
import { ThemeToggle } from '~/components/common/theme_toggle';

const LINKS = [
	{
		href: '/',
		label: 'Accueil',
	},

	{
		href: '/test',
		label: 'Test',
	},
];

interface NavbarProps {
	width: string;
}

export const Navbar = ({ width }: NavbarProps) => (
	<nav className="fixed top-4 left-0 right-0 z-10">
		<div className="container mx-auto px-4" style={{ width }}>
			<div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg px-4 py-2 flex items-center justify-between gap-3">
				<div className="flex items-center gap-4">
					{LINKS.map((link) => (
						<Link
							href={link.href}
							className={`text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white`}
						>
							<Trans>{link.label}</Trans>
						</Link>
					))}
				</div>
				<div className="flex items-center gap-3">
					<LocaleSelector />
					<ThemeToggle />
				</div>
			</div>
		</div>
	</nav>
);
