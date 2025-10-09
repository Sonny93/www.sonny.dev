import { PropsWithChildren } from 'react';

interface TimelineListProps extends PropsWithChildren {
	className?: string;
}

export const TimelineList = ({
	children,
	className = '',
}: TimelineListProps) => (
	<div
		className={`
			relative max-w-4xl mx-auto space-y-8
			before:content-[''] before:absolute before:top-0 before:left-1/2
			before:-translate-x-1/2 before:w-1 before:h-full
			before:bg-gradient-to-b before:from-purple-500 before:to-blue-500
			before:rounded-full before:shadow-lg
			${className}
		`
			.trim()
			.replace(/\s+/g, ' ')}
	>
		{children}
	</div>
);
