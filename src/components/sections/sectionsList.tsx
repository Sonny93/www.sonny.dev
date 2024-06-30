import styled from '@emotion/styled';
import { sections } from '~/config';
import { fadeIn } from '~/globalStyles';
import { Section } from '~/types';

const PageContent = styled.div({
  zIndex: 1,
  height: '100%',
  width: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'hidden',
  animation: `0.5s ${fadeIn} both`,
});

const SectionStyle = styled.div<{ fullSize: boolean }>(({ fullSize }) => ({
  minHeight: fullSize ? '100%' : 'auto',
  height: fullSize ? '100%' : 'auto',
  width: '1100px',
  padding: '0 30px',
  '& > div:not(.home)': {
    height: '100%',
    width: '100%',
    display: 'inline-block',
    paddingTop: '10px',
  },
  '&:not': {
    marginBottom: '50px',
  },
  '@media (max-width: 1430px)': {
    width: '100%',
    paddingRight: '10px',
    paddingLeft: '20px',
  },
}));

export default function SectionsList(): JSX.Element {
  return (
    <PageContent id="page-content">
      {sections.map((section: Section, key: number) => (
        <SectionStyle
          key={key}
          fullSize={section.name === 'home' || section.name === 'contact'}
          id={section.name}
        >
          <section.component {...section} />
        </SectionStyle>
      ))}
    </PageContent>
  );
}
