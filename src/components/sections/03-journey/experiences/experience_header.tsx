import { Experience } from '~/data/experiences';

const ExperienceHeader = ({ title, jobKind }: Experience) => (
  <span css={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
    {jobKind} {title}
  </span>
);

export default ExperienceHeader;
