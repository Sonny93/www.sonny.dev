import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
    sections: any;
}

function Accueil({ sections }: AccueilProps) {
    const [nextSection, setNextSection] = useState<Section | undefined>(
        undefined
    );

    useEffect(() => {
        if (sections.length > 1) {
            setNextSection(sections[1]);
        }
    }, [sections]);

    function handleNextSection() {
        if (nextSection) {
            ScrollToSection(nextSection);
        }
    }

    return (
        <div className="accueil">
            <h1>{name}</h1>
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
