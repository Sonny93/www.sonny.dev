interface SectionTitleProps {
	title: string;
}

export const SectionTitle = ({ title }: Readonly<SectionTitleProps>) => (
	<div className="mb-8 grid grid-cols-[auto_1fr] items-center gap-3 sm:gap-4">
		<span
			className="relative -bottom-1/2 h-0.5 w-8 rounded-full bg-gray-900 dark:bg-white/90"
			aria-hidden
		/>
		<h2 className="text-lg text-center uppercase tracking-[0.25rem] text-gray-500 dark:text-gray-100">
			{title}
		</h2>
	</div>
);
