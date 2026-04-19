import type { ReactNode } from 'react';

interface SectionTitleProps {
	title: ReactNode;
}

export const SectionTitle = ({ title }: Readonly<SectionTitleProps>) => (
	<div className="relative mb-8 flex w-full justify-center px-4 sm:mb-12">
		<span
			className="absolute -bottom-1/4 h-0.5 w-6 rounded-full bg-gray-900 sm:w-8 dark:bg-white/90"
			aria-hidden
		/>
		<h2 className="text-center text-lg uppercase tracking-[0.18rem] text-gray-800 text-balance sm:text-xl sm:tracking-[0.25rem] dark:text-gray-100">
			{title}
		</h2>
	</div>
);
