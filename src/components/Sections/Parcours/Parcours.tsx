import React from "react";

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
            <div className="formations">
                <h1>Formations</h1>
                <div className="timeline-container">
                    <div className="timeline"></div>
                    <ul className="reset">
                        {formations.map(({ dateDebut, dateFin, ville, cp, etablissement, details }: FormationProps, key: number) => {
                            return (
                                <li key={key} className="item">
                                    <div className="label box">
                                        {details}
                                    </div>
                                    <div className="details">
                                        <div className="date">
                                            {dateDebut} - {dateFin}
                                        </div>
                                        <div className="location">
                                            {etablissement} — {ville} ({cp})
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="experiences-pro">
                <h2>Expériences professionnelles</h2>
            </div>
        </div>
    );
}
