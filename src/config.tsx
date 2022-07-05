import React, { createContext } from 'react';
import { BsDiscord, BsGithub, BsLinkedin } from 'react-icons/bs';
import { IoMailOutline } from 'react-icons/io5';

import Accueil from './components/Sections/Accueil/Accueil';
import APropos from './components/Sections/APropos/APropos';
import BTS from './components/Sections/BTS/BTS';
import Contact from './components/Sections/Contact/Contact';
import Parcours from './components/Sections/Parcours/Parcours';
import Projets from './components/Sections/Projets/Projets';
import VeilleTechnologique from './components/Sections/VeilleTechno/Veille';

import { Section, SocialNetwork } from './types';

export const PATH_BG_IMG = '/img/background';
export const PATH_BG_PROJETS = '/img/projets';

export const name: string = 'Sonny';
export const email: string = 'sonnylallier1@gmail.com';

export const socialNetworks: Array<SocialNetwork> = [
    {
        id: 'github',
        link: 'https://github.com/Sonny93',
        icon: <BsGithub />,
        title: 'Page Github'
    }, {
        id: 'linkedin',
        link: 'https://www.linkedin.com/in/sonnylallier/',
        icon: <BsLinkedin />,
        title: 'Page Linkedin'
    }, {
        id: 'discord',
        link: 'https://discord.com/',
        icon: <BsDiscord />,
        title: 'Identifiant Discord : Sonny#0005'
    }, {
        id: 'email',
        link: 'mailto:' + email,
        icon: <IoMailOutline />,
        title: 'Adresse email : ' + email
    }
];

export const sections = [{
    name: 'accueil',
    label: 'Accueil',
    background: 'accueil-bg.webp',
    component: Accueil
}, {
    name: 'aboutme',
    label: 'À propos',
    background: 'apropos-bg.webp',
    component: APropos
}, {
    name: 'btssio',
    label: 'BTS SIO',
    background: 'bts-sio-bg.webp',
    component: BTS
}, {
    name: 'parcours',
    label: 'Mon parcours',
    background: 'mon-parcours-bg.webp',
    component: Parcours
}, {
    name: 'projets',
    label: 'Mes projets',
    background: 'mes-projets-bg.webp',
    component: Projets
}, {
    name: 'veilletechno',
    label: 'Veille Technologique',
    background: 'veille-techno-bg.webp',
    component: VeilleTechnologique
}, {
    name: 'contact',
    label: 'Me contacter',
    background: 'me-contacter-bg.webp',
    component: Contact
}] as Section[];

export const SectionsProvider = createContext(sections);