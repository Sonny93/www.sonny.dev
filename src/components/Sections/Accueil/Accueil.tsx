import { useEffect, useState } from "react";
import { Link } from "react-scroll";

import Avatar from "components/Avatar";

import { name, SectionsProvider } from "config";
import { Section } from "types";

import "./accueil.scss";

export default function AccueilWrapper() {
    return (
        <SectionsProvider.Consumer>
            {(value) => <Accueil sections={value} />}
        </SectionsProvider.Consumer>
    );
}

interface AccueilProps {
    sections: Array<Section>;
}

function Accueil({ sections }: AccueilProps): JSX.Element {
    const [nextSection, setNextSection] = useState<Section | undefined>(
        undefined
    );

    useEffect(() => {
        if (sections.length > 1) {
            setNextSection(sections[1]);
        }
    }, [sections]);

    return (
        <div className="accueil">
            <Avatar size={240} />
            <h2>{name} ✌️</h2>
            <h1>
                Développeur <span className="type">Fullstack</span>
            </h1>
            <p>
                Étudiant en Bachelor Développement fullstack & DevOps à{" "}
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
                        smooth
                        to={nextSection.name}
                        containerId="page-content"
                    >
                        <ScrollMouse />
                    </Link>
                    <p>Défiler pour voir la suite !</p>
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
