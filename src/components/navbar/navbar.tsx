import { MouseEvent, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";

import Avatar from "components/avatar";

import { name, socialNetworks } from "config";
import { Section, SocialNetwork } from "types";

import "./navbar.scss";

export interface NavbarProps {
  sections: Array<any>;
  setActiveSection: (name: string) => void;
}

export default function Navbar({ sections, setActiveSection }: NavbarProps) {
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
    currentTarget.className.startsWith("navbar-wrapper")
      ? setMenuOpen(false)
      : null;

  const classNameNavbar = `navbar-wrapper ${
    isMobile ? (menuOpen ? "mobile-open" : "mobile-close") : ""
  }`;
  return (
    <>
      <div className="btn-navbar-menu" onClick={toggleMenu}>
        <AiOutlineMenu />
      </div>
      <div className={classNameNavbar} onClick={handleClickNavbarWrapper}>
        <div className="navbar">
          <div className="header">
            <Avatar size={168} />
            <h2>{name}</h2>
            <p>Où me retrouver ?</p>
            <ul className="find-me">
              {socialNetworks.map((social, key) => (
                <NavbarSocialItem key={key} {...social} />
              ))}
            </ul>
          </div>
          <ul className="items">
            {sections.map((section, key) => (
              <NavbarSectionItem
                setActiveSection={setActiveSection}
                section={section}
                key={key}
              />
            ))}
          </ul>
          <div className="footer">
            Fait avec ❤️ par <b>{name}</b>
          </div>
        </div>
      </div>
    </>
  );
}

function NavbarSectionItem({
  section,
  setActiveSection,
}: {
  section: Section;
  setActiveSection: (name: string) => void;
}) {
  const { name, label } = section;
  return (
    <li>
      <Link
        className="navbar-item"
        activeClass="active"
        href="#"
        smooth
        spy
        to={name}
        containerId="page-content"
        onSetActive={setActiveSection}
        offset={-(window.innerHeight / 2.75)}
      >
        {label}
      </Link>
    </li>
  );
}

function NavbarSocialItem({ title, link, icon }: SocialNetwork) {
  return (
    <li className="item">
      <a href={link} target="_blank" rel="noreferrer" title={title}>
        {icon}
      </a>
    </li>
  );
}
