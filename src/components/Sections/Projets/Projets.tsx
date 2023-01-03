import React from "react";
import { BsGithub } from "react-icons/bs";

import { Projet } from "../../../types";
import projetList from "./projets.json";

import "./projets.scss";

const PATH_IMAGES = "/img/projets";

export default function Projets() {
    const projets = projetList.filter((projet: Projet) => !projet?.disabled);
    return (
        <div className="projets">
            <h1>Mes projets</h1>
            <p className="box">
                Voici quelques uns de mes projets réalisés sur mon temps libre.
                Le code source de chacun des projets est sur Github (dans des
                repos privés) et sont hébergés chez Vercel ou sur mon VPS.
            </p>
            <ul className="reset">
                {projets.map((projet: Projet, key: number) => (
                    <ProjectItem projet={projet} key={key} />
                ))}
            </ul>
        </div>
    );
}

function ProjectItem({ projet }: { projet: Projet }) {
    const { nom, description, url, thumbnail, languages, github } = projet;

    return (
        <li className="projet">
            <a
                className="direct-link"
                href={url}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={PATH_IMAGES + "/" + thumbnail}
                    alt={`${nom} thumbnail`}
                />
                <div className="details">
                    <span className="languages">{languages.join(", ")}</span>
                    <span className="name">{nom}</span>
                </div>
            </a>
            <div className="description">
                <div className="details-description">{description}</div>
                <div className="github">
                    {github ? (
                        <a href={github} target="_blank" rel="noreferrer">
                            <BsGithub /> Github
                        </a>
                    ) : (
                        <i>Github non disponible</i>
                    )}
                </div>
            </div>
        </li>
    );
}
