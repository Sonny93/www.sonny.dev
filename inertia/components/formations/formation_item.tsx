import { Formation } from '#shared/types/index';

interface FormationItemProps {
	formation: Formation;
	isLast?: boolean;
}

export const FormationItem = ({
	formation,
	isLast = false,
}: FormationItemProps) => {
	const formatDate = (date: string) => {
		const d = new Date(date);
		const month = d.toLocaleDateString('en-US', { month: 'long' });
		const year = d.getFullYear();
		return `${month} ${year}`;
	};

	const formatPeriod = () => {
		const start = formatDate(formation.startDate);
		if (formation.endDate) {
			const end = formatDate(formation.endDate);
			return `${start} - ${end}`;
		}
		return `${start} - Present`;
	};

	const descriptionParts = [
		formation.schoolName,
		formation.location && `📍 ${formation.location}`,
		formation.result && `Result: ${formation.result}`,
	].filter(Boolean);

	return (
		<li className={isLast ? 'ms-4' : 'mb-10 ms-4'}>
			<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
			<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
				{formatPeriod()}
			</time>
			{formation.url ? (
				<a
					href={formation.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lg font-semibold text-purple-400 dark:text-purple-300 hover:underline block mb-4"
				>
					{formation.degreeName}
				</a>
			) : (
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{formation.degreeName}
				</h3>
			)}
			<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
				{descriptionParts.join(' • ')}
			</p>
		</li>
	);
};
