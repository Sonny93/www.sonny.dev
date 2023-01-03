import React from "react";
import { CgChevronDoubleRight } from "react-icons/cg";

import experiences from "./experiences.json";
import formations from "./formations.json";

import { Experience, Formation } from "../../../types";

import "./parcours.scss";

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
                            {formations.map(
                                (formation: Formation, key: number) => (
                                    <FormationItem key={key} {...formation} />
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="timeline-wrapper">
                    <h2>Expériences professionnelles</h2>
                    <div className="timeline-container">
                        <div className="timeline"></div>
                        <ul className="reset">
                            {experiences.map(
                                (experience: Experience, key: number) => (
                                    <ExperienceItem key={key} {...experience} />
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormationItem({
    details,
    dateDebut,
    dateFin,
    duree,
    etablissement,
    ville,
    codePostal,
}: Formation) {
    return (
        <>
            <li className="item">
                <div className="label" title={details}>
                    {details}
                </div>
                <div className="details">
                    <div className="date">
                        {dateDebut === dateFin ? (
                            dateDebut
                        ) : (
                            <>
                                {dateDebut} - {dateFin}
                            </>
                        )}{" "}
                        {duree && (
                            <span style={{ color: "#aaa" }}>
                                {" "}
                                — {duree} an{duree > 1 ? "s" : ""}
                            </span>
                        )}
                    </div>
                    <div className="location">
                        <CgChevronDoubleRight /> {etablissement}
                        <span style={{ color: "#aaa" }}>
                            {" "}
                            — {ville}, {codePostal}
                        </span>
                    </div>
                </div>
            </li>
        </>
    );
}

function ExperienceItem({
    details,
    shortDate,
    duree,
    entreprise,
    ville,
    codePostal,
}: Experience) {
    return (
        <>
            <li className="item">
                <div className="label" title={details}>
                    {details}
                </div>
                <div className="details">
                    <div className="date">
                        {shortDate}{" "}
                        <span style={{ color: "#aaa" }}>
                            {" "}
                            — {duree} semaines
                        </span>
                    </div>
                    <div className="location">
                        <CgChevronDoubleRight /> {entreprise}
                        <span style={{ color: "#aaa" }}>
                            {" "}
                            — {ville}, {codePostal}
                        </span>
                    </div>
                </div>
            </li>
        </>
    );
}
