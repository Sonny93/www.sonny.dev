import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface TimelineItemProps extends PropsWithChildren {
	side?: 'left' | 'right';
}

export const TimelineItem = ({
	children,
	side = 'left',
}: TimelineItemProps) => (
	<div
		className={clsx(
			'relative flex items-center',
			side === 'left' ? 'justify-start' : 'justify-end',
			side === 'left' ? '-translate-x-6' : 'translate-x-6'
		)}
	>
		<div
			className={clsx(
				'relative w-full max-w-md',
				side === 'left' ? 'mr-16' : 'ml-16'
			)}
		>
			{/* Timeline dot */}
			<div
				className={clsx(
					'absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full',
					'bg-gradient-to-r from-purple-500 to-blue-500',
					'shadow-lg border-4 border-gray-900 z-10',
					side === 'left' ? 'right-[-2rem]' : 'left-[-2rem]'
				)}
			/>

			{/* Content card */}
			<div
				className={clsx(
					'bg-gray-800/80 backdrop-blur-sm rounded-xl p-6',
					'border border-gray-700 hover:border-purple-500/50',
					'transition-all duration-300 hover:shadow-xl',
					'hover:shadow-purple-500/10 hover:-translate-y-1'
				)}
			>
				{children}
			</div>
		</div>
	</div>
);
