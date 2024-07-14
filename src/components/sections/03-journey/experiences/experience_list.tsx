import TimelineList from '~/components/common/timeline_list';
import ExperienceItem from '~/components/sections/03-journey/experiences/experience_item';
import { experiences } from '~/data/experiences';

const ExperienceList = () => (
  <TimelineList>
    {experiences.map((experience) => (
      <ExperienceItem key={experience.title} {...experience} />
    ))}
  </TimelineList>
);

export default ExperienceList;
