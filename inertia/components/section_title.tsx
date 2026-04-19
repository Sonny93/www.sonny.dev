interface SectionTitleProps {
	title: string;
}

export const SectionTitle = ({ title }: Readonly<SectionTitleProps>) => (
	<div className="relative w-full mb-12">
		<span
			className="absolute -bottom-1/4 h-0.5 w-8 rounded-full bg-gray-900 dark:bg-white/90"
			aria-hidden
		/>
		<h2 className="text-lg text-center uppercase tracking-[0.25rem] text-gray-800 dark:text-gray-100">
			{title}
		</h2>
	</div>
);
