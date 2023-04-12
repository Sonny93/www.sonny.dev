import React from "react";
import { BsGithub } from "react-icons/bs";

import { buildProjectImageUrl } from "../../../Utils/link";
import { Projet } from "../../../types";
import projetList from "./projets.json";

import "./projets.scss";

export default function Projets() {
    const projets = projetList.filter((projet: Projet) => !projet?.disabled);
    return (
        <div className="projets">
            <h2>Mes projets</h2>
            <p className="box">
                Ci-dessous la liste des projets que j'ai réalisé sur mon temps
                libre.
                <br />
                J'ai utilisé Github pour le versionning, et m'occupe moi-même de
                l'hébergement des ces derniers.
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
    const { description, github } = projet;

    return (
        <li className="projet">
            <ProjectItemLink projet={projet} />
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

function ProjectItemLink({ projet }: { projet: Projet }) {
    const { thumbnail, nom, languages, url } = projet;

    if (!url) {
        return (
            <div className="direct-link">
                <img
                    src={buildProjectImageUrl(thumbnail)}
                    alt={`${nom} thumbnail`}
                />
                <div className="details">
                    <span className="languages">{languages.join(", ")}</span>
                    <span className="name">{nom}</span>
                </div>
            </div>
        );
    }

    return (
        <a className="direct-link" href={url} target="_blank" rel="noreferrer">
            <img
                src={buildProjectImageUrl(thumbnail)}
                alt={`${nom} thumbnail`}
            />
            <div className="details">
                <span className="languages">{languages.join(", ")}</span>
                <span className="name">{nom}</span>
            </div>
        </a>
    );
}
