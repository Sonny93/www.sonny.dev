import packageJson from '@/package.json';
import styled from '@emotion/styled';
import { MouseEvent, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '~/components/avatar';
import ExternalLink from '~/components/externalLink';
import BtnNavbarMenu from '~/components/navbar/btnNavbarMenu';
import FindMe from '~/components/navbar/findMe';
import NavbarFooter from '~/components/navbar/navbarFooter';
import NavbarSectionItem from '~/components/navbar/navbarSectionItem';
import NavbarSectionList from '~/components/navbar/navbarSectionList';
import NavbarSocialItem from '~/components/navbar/navbarSocialItem';
import NavbarStyle from '~/components/navbar/navbarStyle';
import NavbarWrapper from '~/components/navbar/navbarWrapper';
import { name, sections, socialNetworks } from '~/config';
import { styleVars } from '~/globalStyles';

const NavbarTitle = styled.h2({
  textAlign: 'center',
});

export interface NavbarProps {
  setActiveSection: (name: string) => void;
}

export default function Navbar({ setActiveSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setMenuOpen(false);
      setIsMobile(true);
    }
  };
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  const toggleMenu = () => setMenuOpen((state: boolean) => !state);
  const handleClickNavbarWrapper = ({
    currentTarget,
  }: MouseEvent<HTMLElement>) =>
    currentTarget.id === 'navbar-wrapper' ? setMenuOpen(false) : null;

  return (
    <>
      <BtnNavbarMenu onClick={toggleMenu}>
        <AiOutlineMenu />
      </BtnNavbarMenu>
      <NavbarWrapper
        isActive={isMobile ? menuOpen : false}
        onClick={handleClickNavbarWrapper}
        id="navbar-wrapper"
      >
        <NavbarStyle>
          <div css={{ height: 'fit-content', width: '100%' }}>
            <Avatar size={168} />
            <NavbarTitle>{name}</NavbarTitle>
            <p
              css={{
                fontSize: '0.9em',
                fontStyle: 'italic',
                margin: '5px 0',
              }}
            >
              Où me retrouver ?
            </p>
            <FindMe>
              {socialNetworks.map((social, key) => (
                <NavbarSocialItem key={key} {...social} />
              ))}
            </FindMe>
          </div>
          <NavbarSectionList>
            {sections.map((section, key) => (
              <NavbarSectionItem
                setActiveSection={setActiveSection}
                section={section}
                key={key}
              />
            ))}
          </NavbarSectionList>
          <NavbarFooter>
            <span title="Oui je l'ai fait moi-même 👀">
              Fait avec ❤️ par {name}
            </span>
            <ExternalLink
              href="https://github.com/Sonny93/portfolio"
              css={{ color: styleVars.gray }}
            >
              Version {packageJson.version}
            </ExternalLink>
          </NavbarFooter>
        </NavbarStyle>
      </NavbarWrapper>
    </>
  );
}
