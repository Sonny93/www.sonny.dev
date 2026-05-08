import type { ReactNode } from 'react';

import { SectionTitle } from '../section_title';

export type VerticalTimelineItem = {
	id: string;
	title: string;
	titleVariant?: 'default' | 'uppercase';
	subtitle?: string;
	meta: ReactNode;
	bullets?: readonly string[];
};

export type VerticalTimelineProps = {
	title: ReactNode;
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
			<SectionTitle title={title} />
			<ul className="relative ml-0.5 space-y-10 border-l border-white/18 pl-6 sm:ml-1 sm:pl-8">
				{items.map((item) => (
					<li key={item.id} className="relative">
						<span
							className="absolute right-full top-[0.65em] mr-3 h-px w-5 rounded-full bg-white/28 sm:w-6"
							aria-hidden
						/>
						<div className="min-w-0">
							<p className="text-pretty text-[0.95rem] leading-snug text-white/95 sm:text-base">
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
										<span className="font-normal text-white/85">
											{item.subtitle}
										</span>
									</>
								) : null}
							</p>
							<div className="mt-1.5 text-pretty text-sm leading-relaxed text-white/65">
								{item.meta}
							</div>
							{item.bullets && item.bullets.length > 0 ? (
								<ul className="mt-3 list-none space-y-2 pl-0.5">
									{item.bullets.map((line) => (
										<li
											key={line}
											className="flex gap-2.5 text-sm leading-relaxed text-white/75"
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
