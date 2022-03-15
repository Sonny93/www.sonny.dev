import React from 'react';

import { BsCodeSlash, BsWrench } from 'react-icons/bs';
import { HiDesktopComputer } from 'react-icons/hi';

import { name } from '../../../config';

import "./apropos.scss";
import { List } from '../../../Utils/Texte';

export default function APropos() {
    return (
        <div className="about-me">
            <h1>Présentation</h1>
            <p className="box">
                Moi c'est <b>{name}</b>, étudiant de 19 ans en deuxième année de <b>BTS SIO</b> (<b>Option SLAM</b>).
                <br />
                Passioné par l'informatique depuis des années, j'ai eu l'occasion de toucher un peu à tout mais le développement (Web mais pas que) reste mon domaine de prédilection !
            </p>
            <h2>Mes compétences</h2>
            <div className="box competences">
                <div className="column">
                    <h3><BsCodeSlash /> Languages</h3>
                    <List
                        items={['HTML', 'CSS — SASS', 'JS (React — Next, Express, Fastify)', 'PHP', 'SQL', 'Python', 'C#']}
                    />
                </div>
                <div className="column">
                    <h3><HiDesktopComputer /> Systèmes d'exploitation</h3>
                    <List
                        items={['Windows', 'Linux — Debian']}
                    />
                </div>
                <div className="column">
                    <h3><BsWrench />Outils</h3>
                    <List
                        items={['Visual Studio Code', 'Docker', 'Git — Github']}
                    />
                </div>
            </div>
        </div>
    );
}
