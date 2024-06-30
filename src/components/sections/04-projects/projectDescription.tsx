import styled from '@emotion/styled';
import { styleVars } from '~/globalStyles';

const ProjectDescriptionWrapper = styled.div({
  height: '100%',
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  '& a': {
    fontSize: '0.9em',
    color: styleVars.white,
    backgroundColor: styleVars.blue,
    padding: '0.5em 0.75em',
    borderRadius: '3px',
    border: `1px solid ${styleVars.blue}`,
    display: 'flex',
    gap: '0.5em',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.15s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  '@media (max-width: 1224px)': {
    width: '100%',
  },
});

const ProjectDescription = styled.div({
  height: '100%',
  width: '400px',
  lineHeight: '1.35em',
  color: styleVars.white,
  backgroundColor: styleVars.black,
  padding: '1.5em',
  borderRadius: styleVars.borderRadius,
  transition: '0.15s',
  '@media (max-width: 1224px)': {
    width: '100%',
  },
});

export { ProjectDescription, ProjectDescriptionWrapper };
