import styled from '@emotion/styled';
import { styleVars } from '~/globalStyles';

const TimelineItem = styled.li({
  position: 'relative',
  marginBottom: '2em',
  display: 'flex',
  gap: '5px',
  alignItems: 'flex-start',
  flexDirection: 'column',

  '&:before': {
    position: 'absolute',
    top: '-0.1em',
    left: '-2.45em',
    content: '""',
    padding: '10px',
    backgroundColor: styleVars.gray,
    border: `5px solid ${styleVars.blue}`,
    borderRadius: '50%',
  },

  '&:last-child': {
    marginBottom: '-2em',
  },
});

const TimelineItemLabel = styled.div({
  width: '100%',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TimelineItemDetails = styled.div({
  position: 'relative',
  width: '100%',
  padding: '15px',
  backgroundColor: styleVars.black,
  borderRadius: styleVars.borderRadius,
  gap: '0 10px',
  display: 'flex',
  flexDirection: 'column',
});

const TimelineItemLocation = styled.div({
  display: 'flex',
  gap: '2px',
  alignItems: 'center',
});

const TimelineItemDate = styled.div({
  display: 'flex',
  gap: '0.5em',
  alignItems: 'center',
});

const TimelineItemDateLabel = styled.div({
  textTransform: 'capitalize',
});

const TimelineItemDuration = styled.div({
  color: styleVars.gray,
});

const TimelineItemType = styled.div({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  color: styleVars.blue,
  transform: 'translate(-50%, 100%)',
});

export {
  TimelineItem,
  TimelineItemDate,
  TimelineItemDateLabel,
  TimelineItemDetails,
  TimelineItemDuration,
  TimelineItemLabel,
  TimelineItemLocation,
  TimelineItemType,
};
