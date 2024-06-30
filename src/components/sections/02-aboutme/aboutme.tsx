import styled from '@emotion/styled';
import skills from '~/data/skills';
import { styleVars } from '~/globalStyles';
import { ReactNode } from 'react';
import Tilt from 'react-parallax-tilt';
import { Skill } from '~/types';

const SmallTitle = styled.h3({
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
});

const Skills = styled.div({
  display: 'flex',
  alignIems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const SkillStyle = styled.li({
  userSelect: 'none',
  height: '95px',
  width: '160px',
  backgroundColor: styleVars.black,
  borderRadius: styleVars.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  transition: '0.15s',

  '&:hover': {
    background: styleVars.lightBlack,
    boxShadow: '0px 8px 4px -4px var(--lng-color)',
    transform: 'scale(1.15)',
  },

  '& > svg': {
    fontSize: '1.75em',
    filter: 'drop-shadow(0 0 0.25em var(--lng-color))',
  },
});

const Languages = styled.ul({
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
});

const APropos = () => (
  <div>
    <h2>Mes compétences</h2>
    <Skills>
      {skills.map(({ name, skills }) => (
        <div css={{ width: '100%' }} key={name}>
          <SmallTitle>&#60;{name} /&#62;</SmallTitle>
          <Languages className="reset">{skills.map(BuildItem)}</Languages>
        </div>
      ))}
    </Skills>
  </div>
);

const BuildItem = ({ label, icon, color }: Skill) => (
  <SkillItem color={color} key={label}>
    {icon}
    {label}
  </SkillItem>
);

interface SkillItemProps {
  children: ReactNode;
  color?: string;
}
const SkillItem = ({ children, color = '' }: SkillItemProps) => (
  <Tilt tiltReverse perspective={500}>
    <SkillStyle style={{ '--lng-color': color } as any}>{children}</SkillStyle>
  </Tilt>
);

export default APropos;
