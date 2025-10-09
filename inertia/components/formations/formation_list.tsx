import { Formation } from '#shared/types/index';
import { TimelineItem } from '~/components/common/timeline/timeline_item';
import { TimelineList } from '~/components/common/timeline/timeline_list';
import { withFormations, WithFormationsProps } from '~/hooks/use_formations';

interface FormationTimelineItemProps {
	formation: Formation;
	index: number;
}

const FormationTimelineItem = ({
	formation,
	index,
}: FormationTimelineItemProps) => {
	const formatDate = (date: string) => {
		return new Date(date).getFullYear().toString();
	};

	const formatPeriod = () => {
		const start = formatDate(formation.startDate);
		const end = formation.endDate ? formatDate(formation.endDate) : 'En cours';
		return `${start} - ${end}`;
	};

	const isEven = index % 2 === 0;

	return (
		<TimelineItem side={isEven ? 'left' : 'right'}>
			<div className="space-y-3">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-white mb-1">
							{formation.degreeName}
						</h3>
						<p className="text-purple-400 font-medium text-sm">
							{formation.schoolName}
						</p>
						{formation.location && (
							<p className="text-gray-400 text-xs mt-1">
								📍 {formation.location}
							</p>
						)}
					</div>
					<span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
						{formation.degreeType.toUpperCase()}
					</span>
				</div>

				{/* Period and Result */}
				<div className="flex justify-between items-center">
					<span className="text-gray-300 text-sm">{formatPeriod()}</span>
					{formation.result && (
						<span className="text-green-400 text-sm font-medium">
							{formation.result}
						</span>
					)}
				</div>

				{/* URL Link */}
				{formation.url && (
					<div className="pt-2 border-t border-gray-700">
						<a
							href={formation.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-purple-400 hover:text-purple-300 text-xs transition-colors inline-flex items-center gap-1"
						>
							🌐 Voir l'école →
						</a>
					</div>
				)}
			</div>
		</TimelineItem>
	);
};

export const FormationList = withFormations((props: WithFormationsProps) => (
	<TimelineList>
		{props.formations.map((formation, index) => (
			<FormationTimelineItem
				key={`${formation.schoolName}-${index}`}
				formation={formation}
				index={index}
			/>
		))}
	</TimelineList>
));
