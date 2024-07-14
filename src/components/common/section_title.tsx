import styled from '@emotion/styled';
import { styleVars } from '~/globalStyles';

const SectionTitle = styled.h1({
  width: '100%',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '5px',
  fontWeight: 300,

  '&::after': {
    height: '0.35rem',
    width: '3.5rem',
    content: '""',
    display: 'block',
    backgroundColor: styleVars.white,
  },
});
export default SectionTitle;
