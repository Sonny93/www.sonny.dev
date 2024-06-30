import styled from '@emotion/styled';
import { styleVars } from '~/globalStyles';

const ProjectCard = styled.li({
  height: 'auto',
  width: 'fit-content',
  marginBottom: '15px',
  gap: '15px',
  display: 'flex',
  alignItems: 'flex-start',
  transition: '.15s',

  '&:nth-of-type(even)': {
    flexDirection: 'row-reverse',
  },

  '&:hover': {
    '& .details-wrapper': {
      transform: 'scale(1.05)',
    },
    '& .description': {
      boxShadow: `inset 0 0 3px 1px ${styleVars.black}`,
    },
    '& img, & .details': {
      boxShadow: `0 0 8px 2px ${styleVars.black}`,
    },
  },

  '@media (max-width: 1224px)': {
    width: '100%',
    marginBottom: '25px',
    flexDirection: 'column !important' as any,
  },
});

export default ProjectCard;
