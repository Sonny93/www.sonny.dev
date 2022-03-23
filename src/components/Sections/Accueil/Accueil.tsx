import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

import { Section, SectionsProvider } from "../../../App";
import { name } from "../../../config";
import { ScrollToSection } from "../../../Utils/Navigation";

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

function Accueil({ sections }: AccueilProps) {
    const [nextSection, setNextSection] = useState<Section | undefined>(undefined);

    useEffect(() => {
        if (sections.length > 1) {
            setNextSection(sections[1]);
        }
    }, [sections]);

    const handleNextSection = () => nextSection ? ScrollToSection(nextSection) : null;

    return (
        <div className="accueil">
            <h2>{name}</h2>
            <h1>
                Développeur
                <Typewriter
                    options={{
                        strings: ['Fullstack JS', 'Front End'],
                        autoStart: true,
                        loop: true
                    }}
                />
            </h1>
            <p>Benvenue sur mon Portfolio !</p>
            {nextSection && (
                <div className="wrapper-scroll">
                    <span
                        className="scroll-icon"
                        onClick={() => handleNextSection()}
                    >
                        <span className="scroll-icon__dot"></span>
                    </span>
                    <p>Défiler pour voir la suite !</p>
                </div>
            )}
        </div>
    );
}
