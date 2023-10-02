import { useMemo } from "react";
import { Link } from "react-scroll";

import Avatar from "components/avatar";

import { name, SectionsProvider } from "config";
import { Section } from "types";

import "./home.scss";

export default function HomeWrapper() {
  return (
    <SectionsProvider.Consumer>
      {(value) => <Home sections={value} />}
    </SectionsProvider.Consumer>
  );
}

interface HomeProps {
  sections: Array<Section>;
}

function Home({ sections }: HomeProps): JSX.Element {
  const nextSection = useMemo<Section | undefined>(
    () => (sections.length > 1 ? sections[1] : undefined),
    [sections],
  );

  return (
    <div className="home">
      <Avatar size={240} />
      <h2>{name} ✌️</h2>
      <h1>
        Développeur <span className="highlight">Fullstack</span> &{" "}
        <span className="highlight">DevOps</span>
      </h1>
      <p>
        Étudiant en <u>Mastère dev bigdata & IA</u> à{" "}
        <a
          href="https://ecole-ipssi.com/ecole-informatique-paris/"
          target="_blank"
          rel="noreferrer"
        >
          IPSSI Paris
        </a>
      </p>
      {nextSection && (
        <div className="wrapper-scroll">
          <Link
            href="#"
            smooth
            to={nextSection.name}
            containerId="page-content"
          >
            <ScrollMouse />
            <p>Défiler pour voir la suite !</p>
          </Link>
        </div>
      )}
    </div>
  );
}

const ScrollMouse = (): JSX.Element => (
  <span className="scroll-icon">
    <span className="scroll-icon__dot"></span>
  </span>
);
