import styled from '@emotion/styled';
import { Link } from 'react-scroll';
import Avatar from '~/components/avatar';
import ExternalLink from '~/components/externalLink';
import ScrollMouse from '~/components/scrollButton';
import { name, sections } from '~/config';
import { styleVars } from '~/globalStyles';

const HomeStyle = styled.div({
  userSelect: 'none',
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const Title = styled.h1({
  fontSize: '2.5em',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  margin: '.75em 0',
  '@media (max-width: calc(768px + 2em))': {
    fontSize: '2em',
  },
});

const SubText = styled.p({
  fontStyle: 'oblique',
  fontSize: '1.25em',
  textAlign: 'center',
  textUnderlineOffset: '.25em',
  marginTop: '-1em',
  '@media (max-width: calc(768px + 2em))': {
    fontSize: '1.15em',
  },
});

export default function Home(): JSX.Element {
  const nextSection = sections.length > 1 ? sections[1] : undefined;
  return (
    <HomeStyle className="home">
      <Avatar size={240} />
      <h2>{name} ✌️</h2>
      <Title>
        Développeur <span css={{ color: styleVars.blue }}>Fullstack</span> &{' '}
        <span css={{ color: styleVars.blue }}>DevOps</span>
      </Title>
      <SubText>
        Étudiant en <u>Mastère dev bigdata & IA</u> à{' '}
        <ExternalLink href="https://ecole-ipssi.com/ecole-informatique-a-paris/">
          IPSSI Paris
        </ExternalLink>
      </SubText>
      {nextSection && (
        <Link
          className="reset"
          href="#"
          smooth
          to={nextSection.name}
          containerId="page-content"
        >
          <ScrollMouse />
        </Link>
      )}
    </HomeStyle>
  );
}
