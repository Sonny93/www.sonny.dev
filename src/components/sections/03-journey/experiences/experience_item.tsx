import styled from '@emotion/styled';
import ExperienceDetails from '~/components/sections/03-journey/experiences/experience_details';
import ExperienceHeader from '~/components/sections/03-journey/experiences/experience_header';
import { Experience } from '~/data/experiences';

const ExperienceItemStyle = styled.li({
  width: 'fit-content',
  fontWeight: 300,
  letterSpacing: '2px',
  display: 'flex',
  gap: '0.35em',
  justifyContent: 'center',
  flexDirection: 'column',
});

const ExperienceItem = (experience: Experience) => (
  <ExperienceItemStyle>
    <ExperienceHeader {...experience} />
    <ExperienceDetails {...experience} />
    {experience.descriptions && (
      <ul css={{ paddingLeft: '2rem' }}>
        {experience.descriptions.map((desc) => (
          <li css={{ maxWidth: '500px' }} key={desc}>
            {desc}
          </li>
        ))}
      </ul>
    )}
  </ExperienceItemStyle>
);
export default ExperienceItem;
