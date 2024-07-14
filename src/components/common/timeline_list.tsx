import styled from '@emotion/styled';
import { styleVars } from '~/globalStyles';

const TimelineList = styled.ul({
  position: 'relative',
  width: 'fit-content',
  paddingLeft: '2em',
  display: 'flex',
  gap: '2em',
  justifyContent: 'center',
  flexDirection: 'column',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '5px',
    backgroundColor: styleVars.black,
    borderRadius: '3px',
  },

  '& > *': {
    position: 'relative',

    '&::before': {
      position: 'absolute',
      content: '""',
      top: '0.6em',
      left: '-1.7em',
      height: '5px',
      width: '15px',
      backgroundColor: styleVars.black,
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
    },
  },
});

export default TimelineList;
