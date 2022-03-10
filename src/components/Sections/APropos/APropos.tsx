import React from 'react';
import { name } from '../../../config';

import "./apropos.scss";

export default function APropos() {
    return (
        <div className="about-me">
            <h1>Présentation</h1>
            <p className="box">
                Moi c'est <b>{name}</b>, étudiant de 19 ans en deuxième année de
                BTS SIO (Option SLAM).
                <br />
                Passioné par l'informatique depuis des années, j'ai eu
                l'occasion de toucher un peu à tout mais le développement (Web
                mais pas que) reste mon domaine de prédilection !
            </p>
        </div>
    );
}
