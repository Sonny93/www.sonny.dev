import TimelineList from '~/components/common/timeline_list';
import FormationItem from '~/components/sections/03-journey/formations/formation_item';
import { formations } from '~/data/formations';

const FormationList = () => (
  <TimelineList>
    {formations.map((formation) => (
      <FormationItem key={formation.title} {...formation} />
    ))}
  </TimelineList>
);

export default FormationList;
