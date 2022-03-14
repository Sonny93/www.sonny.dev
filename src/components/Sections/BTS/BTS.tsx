import React from 'react';

import { BsCodeSlash, BsHddNetwork } from 'react-icons/bs';
import { boldFirstChar } from '../../../Utils/Texte';

import "./bts.scss";

export default function BTS() {
    return (
        <div className="btssio">
            <h1>Qu'est ce que le BTS SIO</h1>
            <p className="box">
                Le {boldFirstChar('Brevet')} de {boldFirstChar('Technicien')} {boldFirstChar('Supérieur')} {boldFirstChar('Services')} {boldFirstChar('Informatiques')} aux {boldFirstChar('Organisations')} (<b>BTS SIO</b>) est une formation en informatique à destination des futurs administrateurs réseaux et développeurs web.
                <br /><br />
                La formation se décline en deux options : <b>SISR</b> & <b>SLAM</b>
            </p>
            <div className="wrapper-options">
                <div className="option sisr box">
                    <h2><BsHddNetwork /> SISR</h2>
                    <p>
                        L’option {boldFirstChar('Solutions')} d’{boldFirstChar('Informatique')}, {boldFirstChar('Systèmes')} et {boldFirstChar('Réseaux')} forme des professionnels des réseaux et équipements informatiques (installation, maintenance, sécurité). En sortant d’un BTS SIO SISR, vous serez capables de gérer et d’administrer le réseau d’une société et d’assurer sa sécurité et sa maintenance.
                    </p>
                    <p>
                        Les techniciens supérieurs en informatique option SISR, peuvent accéder aux métiers de :
                        <ul>
                            <li>Administrateur systèmes et réseaux</li>
                            <li>Informaticien support et déploiement</li>
                            <li>Pilote d’exploitation</li>
                            <li>Support systèmes et réseaux</li>
                            <li>Technicien d’infrastructure</li>
                            <li>Technicien de production</li>
                            <li>Technicien micro et réseaux</li>
                        </ul>
                    </p>
                </div>
                <div className="option slam box">
                    <h2><BsCodeSlash /> SLAM</h2>
                    <p>
                        L’option {boldFirstChar('Solutions')} {boldFirstChar('Logicielles')} et {boldFirstChar('Applications')} {boldFirstChar('Métiers')} forme des spécialistes des logiciels (rédaction d’un cahier des charges, formulation des besoins et spécifications, développement, intégration au sein de la société).
                    </p>
                    <p>
                        Les techniciens supérieurs en informatique option slam, sont préparés aux métiers de :
                        <ul>
                            <li>Développeur d’applications informatiques</li>
                            <li>Développeur informatique</li>
                            <li>Analyste d’applications ou d’études</li>
                            <li>Analyste programmeur</li>
                            <li>Chargé d’études informatiques</li>
                            <li>Informaticien d’études</li>
                            <li>Programmeur analyste</li>
                            <li>Programmeur d’applications</li>
                            <li>Responsable des services applicatifs</li>
                            <li>Technicien d’études informatiques</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
}
