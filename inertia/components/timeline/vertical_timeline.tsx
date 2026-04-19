import type { ReactNode } from 'react';

export type VerticalTimelineItem = {
	id: string;
	title: string;
	titleVariant?: 'default' | 'uppercase';
	subtitle?: string;
	meta: ReactNode;
	bullets?: readonly string[];
};

export type VerticalTimelineProps = {
	title: string;
	items: readonly VerticalTimelineItem[];
	className?: string;
};

export function VerticalTimeline({
	title,
	items,
	className = '',
}: VerticalTimelineProps) {
	if (items.length === 0) return null;

	return (
		<section className={className}>
			<div className="mb-8 grid grid-cols-[auto_1fr] items-center gap-3 sm:gap-4">
				<span
					className="h-0.5 w-8 rounded-full bg-gray-900 dark:bg-white/90"
					aria-hidden
				/>
				<h2 className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-900 sm:text-sm dark:text-white/95">
					{title}
				</h2>
			</div>
			<ul className="relative ml-0.5 space-y-10 border-l border-gray-300 pl-6 sm:ml-1 sm:pl-8 dark:border-white/18">
				{items.map((item) => (
					<li key={item.id} className="relative">
						<span
							className="absolute right-full top-[0.65em] mr-3 h-px w-5 rounded-full bg-gray-400 dark:bg-white/28 sm:w-6"
							aria-hidden
						/>
						<div className="min-w-0">
							<p className="text-pretty text-[0.95rem] leading-snug text-gray-900 sm:text-base dark:text-white/95">
								<span
									className={
										item.titleVariant === 'uppercase'
											? 'font-bold uppercase tracking-wide'
											: 'font-bold'
									}
								>
									{item.title}
								</span>
								{item.subtitle ? (
									<>
										{' '}
										<span className="font-normal text-gray-700 dark:text-white/85">
											{item.subtitle}
										</span>
									</>
								) : null}
							</p>
							<div className="mt-1.5 text-pretty text-sm leading-relaxed text-gray-600 dark:text-white/65">
								{item.meta}
							</div>
							{item.bullets && item.bullets.length > 0 ? (
								<ul className="mt-3 list-none space-y-2 pl-0.5">
									{item.bullets.map((line) => (
										<li
											key={line}
											className="flex gap-2.5 text-sm leading-relaxed text-gray-700 dark:text-white/75"
										>
											<span
												className="mt-2 size-1.5 shrink-0 rounded-full border border-current opacity-70"
												aria-hidden
											/>
											<span>{line}</span>
										</li>
									))}
								</ul>
							) : null}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
