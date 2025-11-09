import { withFormations, WithFormationsProps } from '~/hooks/use_formations';
import { FormationItem } from './formation_item';

export const FormationList = withFormations((props: WithFormationsProps) => (
	<ol className="relative border-l border-gray-200 dark:border-gray-700">
		{props.formations.map((formation, index) => (
			<FormationItem
				key={`${formation.schoolName}-${formation.startDate}-${index}`}
				formation={formation}
				isLast={index === props.formations.length - 1}
			/>
		))}
	</ol>
));
