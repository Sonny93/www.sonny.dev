import React from 'react';
import { name } from '../../../config';

import "./accueil.scss";

export default function Accueil() {
    return (
        <div className="accueil">
            <h1>{name}</h1>
            <p>Benvenue sur mon Portfolio !</p>
            <div className="wrapper-scroll">
                <span className="scroll-icon">
                    <span className="scroll-icon__dot"></span>
                </span>
                <p>Défiler pour voir la suite !</p>
            </div>
        </div>
    );
}
