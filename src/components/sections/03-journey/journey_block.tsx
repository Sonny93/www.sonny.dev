import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import SectionTitle from '~/components/common/section_title';

const JourneyBlockWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});
const JourneyBlockContainer = styled.div({
  maxWidth: '600px',
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  flexDirection: 'column',
});

const JourneyBlock = ({
  title,
  children,
}: PropsWithChildren & { title: string }) => (
  <JourneyBlockWrapper>
    <JourneyBlockContainer>
      <SectionTitle as="h2">{title}</SectionTitle>
      {children}
    </JourneyBlockContainer>
  </JourneyBlockWrapper>
);
export default JourneyBlock;
