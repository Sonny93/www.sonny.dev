import styled from "@emotion/styled";
import Avatar from "components/avatar";
import { name, sections, socialNetworks } from "config";
import { styleVars } from "globalStyles";
import { MouseEvent, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import packageJson from "../../../package.json";
import BtnNavbarMenu from "./btnNavbarMenu";
import FindMe from "./findMe";
import NavbarFooter from "./navbarFooter";
import NavbarSectionItem from "./navbarSectionItem";
import NavbarSectionList from "./navbarSectionList";
import NavbarSocialItem from "./navbarSocialItem";
import NavbarStyle from "./navbarStyle";
import NavbarWrapper from "./navbarWrapper";

const NavbarTitle = styled.h2({
  textAlign: "center",
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
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const toggleMenu = () => setMenuOpen((state: boolean) => !state);
  const handleClickNavbarWrapper = ({
    currentTarget,
  }: MouseEvent<HTMLElement>) =>
    currentTarget.id === "navbar-wrapper" ? setMenuOpen(false) : null;

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
          <div css={{ height: "fit-content", width: "100%" }}>
            <Avatar size={168} />
            <NavbarTitle>{name}</NavbarTitle>
            <p
              css={{
                fontSize: "0.9em",
                fontStyle: "italic",
                margin: "5px 0",
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
            <span css={{ color: styleVars.gray }}>
              Version {packageJson.version}
            </span>
          </NavbarFooter>
        </NavbarStyle>
      </NavbarWrapper>
    </>
  );
}
