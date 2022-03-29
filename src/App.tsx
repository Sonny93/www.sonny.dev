import React, { createRef, useState, createContext, useEffect } from "react";
import "./App.scss";
import "./input.scss";

import Navbar from "./components/Navbar/Navbar";

// Sections
import Sections from "./components/Sections/Sections";

import Accueil from "./components/Sections/Accueil/Accueil";
import APropos from "./components/Sections/APropos/APropos";
import BTS from "./components/Sections/BTS/BTS";
import Parcours from "./components/Sections/Parcours/Parcours";
import Projets from "./components/Sections/Projets/Projets";
import VeilleTechnologique from "./components/Sections/VeilleTechno/Veille";
import Contact from "./components/Sections/Contact/Contact";

export interface Section {
    name: string;
    label: string;
    background: string;
    component: any;
    ref: React.RefObject<any>;
}

const sections = [
    {
        name: "accueil",
        label: "Accueil",
        background: "accueil-bg.webp",
        component: Accueil,
        ref: createRef(),
    },
    {
        name: "aboutme",
        label: "À propos",
        background: "apropos-bg.webp",
        component: APropos,
        ref: createRef(),
    },
    {
        name: "btssio",
        label: "BTS SIO",
        background: "bts-sio-bg.webp",
        component: BTS,
        ref: createRef(),
    },
    {
        name: "parcours",
        label: "Mon parcours",
        background: "mon-parcours-bg.webp",
        component: Parcours,
        ref: createRef(),
    },
    {
        name: "projets",
        label: "Mes projets",
        background: "mes-projets-bg.webp",
        component: Projets,
        ref: createRef(),
    },
    {
        name: "veilletechno",
        label: "Veille Technologique",
        background: "veille-techno-bg.webp",
        component: VeilleTechnologique,
        ref: createRef(),
    },
    {
        name: "contact",
        label: "Me contacter",
        background: "me-contacter-bg.webp",
        component: Contact,
        ref: createRef(),
    },
];
export const SectionsProvider = createContext(sections);

export default function App() {
    const [activeSection, setActiveSection] = useState<Section>(sections[0]);
    const [background, setBackground] = useState<string>(sections[0].background);

    useEffect(() => {
        for (const { background } of sections) {
            const link = document.createElement('link');
            link.setAttribute('rel', 'preload');
            link.setAttribute('as', 'image');
            link.setAttribute('href', background);
            document.head.appendChild(link);
        }
    }, []);

    function changeBackground(section: Section): void {
        setBackground(section.background);
    }

    return (
        <div className="background" style={{ backgroundImage: `url(${background})` }}>
            <div className="App">
                <SectionsProvider.Provider value={sections}>
                    <Navbar activeSection={activeSection} sections={sections} />
                    <Sections
                        sections={sections}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        changeBackground={changeBackground}
                    />
                </SectionsProvider.Provider>
            </div>
        </div>
    );
}