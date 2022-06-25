import React, { createContext, createRef } from "react";
import { BsGithub, BsLinkedin, BsDiscord } from "react-icons/bs";

import Accueil from "./components/Sections/Accueil/Accueil";
import APropos from "./components/Sections/APropos/APropos";
import BTS from "./components/Sections/BTS/BTS";
import Parcours from "./components/Sections/Parcours/Parcours";
import Projets from "./components/Sections/Projets/Projets";
import VeilleTechnologique from "./components/Sections/VeilleTechno/Veille";
import Contact from "./components/Sections/Contact/Contact";

export const PATH_BG_IMG = '/img/background';
export const PATH_BG_PROJETS = '/img/projets';

export const name: string = "Sonny";
export const email: string = "sonny@example.org";
export const findMe: Array<{ icon: any, link: string }> = [
    {
        link: "https://github.com/Sonny93",
        icon: <BsGithub />
    }, {
        link: "https://linkedin.com/",
        icon: <BsLinkedin />
    }, {
        link: "https://discord.com/",
        icon: <BsDiscord />
    }
];

export const sections = [{
    name: "accueil",
    label: "Accueil",
    background: "accueil-bg.webp",
    component: Accueil,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}, {
    name: "aboutme",
    label: "À propos",
    background: "apropos-bg.webp",
    component: APropos,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}, {
    name: "btssio",
    label: "BTS SIO",
    background: "bts-sio-bg.webp",
    component: BTS,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}, {
    name: "parcours",
    label: "Mon parcours",
    background: "mon-parcours-bg.webp",
    component: Parcours,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}, {
    name: "projets",
    label: "Mes projets",
    background: "mes-projets-bg.webp",
    component: Projets,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}, {
    name: "veilletechno",
    label: "Veille Technologique",
    background: "veille-techno-bg.webp",
    component: VeilleTechnologique,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}, {
    name: "contact",
    label: "Me contacter",
    background: "me-contacter-bg.webp",
    component: Contact,
    ref: createRef<HTMLDivElement>(),
    clientRect: null
}];

export const SectionsProvider = createContext(sections);