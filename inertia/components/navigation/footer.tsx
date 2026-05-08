import clsx from 'clsx';
import { Link } from '@adonisjs/inertia/react';

import { Socials } from '~/constants/socials';
import { getIcon, SocialIcon } from '~/lib/icons';
import { useHeadroom } from '~/hooks/use_headroom';
import { LocaleSwitcher } from '../locale_switcher';

export function Footer() {
	const pinned = useHeadroom({ fixedAt: 120 });
	const footerStateClass = pinned
		? 'translate-y-0 opacity-100'
		: 'translate-y-2 pointer-events-none opacity-0';

	return (
		<footer
			className={clsx(
				'sticky bottom-0 z-[99] grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-md bg-gray-800 px-4 py-2 text-gray-400 transition-[transform,opacity] duration-300 ease-out',
				footerStateClass
			)}
		>
			<p>© 2026 Sonny</p>
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
							className={`${getIcon(key as SocialIcon)} text-gray-400 size-6`}
							aria-hidden
						/>
					</Link>
				))}
			</div>
			<div className="flex min-w-0 items-center justify-end justify-self-end gap-2">
				<LocaleSwitcher />
			</div>
		</footer>
	);
}
