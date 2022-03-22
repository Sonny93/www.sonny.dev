import React from "react";

import { CgChevronDoubleRight } from 'react-icons/cg';

import "./parcours.scss";
import formations from "./formations.json";

interface FormationProps {
    dateDebut: string;
    dateFin: string;
    ville: string;
    cp: number;
    etablissement: string;
    details: string;
}

export default function Parcours() {
    return (
        <div className="parcours">
            <h1>Mon parcours</h1>
            <div className="timelines-wrapper">
                <div className="timeline-wrapper">
                    <h2>Formations</h2>
                    <div className="timeline-container">
                        <div className="timeline"></div>
                        <ul className="reset">
                            {formations.map(({ dateDebut, dateFin, ville, cp, etablissement, details }: FormationProps, key: number) => {
                                return (
                                    <li key={key} className="item">
                                        <div className="label">
                                            {details}
                                        </div>
                                        <div className="details">
                                            <div className="date">
                                                {dateDebut} - {dateFin}
                                            </div>
                                            <div className="location">
                                                <CgChevronDoubleRight /> {etablissement} — {ville} ({cp})
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="timeline-wrapper">
                    <h2>Expériences professionnelles</h2>
                    <div className="timeline-container">
                        <div className="timeline"></div>
                        <ul className="reset">
                            {formations.map(({ dateDebut, dateFin, ville, cp, etablissement, details }: FormationProps, key: number) => {
                                return (
                                    <li key={key} className="item">
                                        <div className="label">
                                            {details}
                                        </div>
                                        <div className="details">
                                            <div className="date">
                                                {dateDebut} - {dateFin}
                                            </div>
                                            <div className="location">
                                                <CgChevronDoubleRight /> {etablissement} — {ville} ({cp})
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
