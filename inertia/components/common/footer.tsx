import { Link } from '@adonisjs/inertia/react';

export const Footer = () => (
	<footer className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 max-w-[1920px] flex items-center justify-center gap-2 py-4 px-6 rounded-md">
		Made by{' '}
		<Link href="https://www.sonny.dev" className="text-blue-400">
			Sonny
		</Link>
	</footer>
);
