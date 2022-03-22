import React from "react";

import "./projets.scss";

interface Projet {
    nom: string;
    url: string;
    thumbnail: string;
    languages: string[];
}

export default function Projets() {
    const projets: Projet[] = [{
        nom: "next-uploader",
        url: "https://uploader.sonnydata.fr/",
        thumbnail: "uploader.png",
        languages: ["HTML", "CSS/SASS", "JS/Next"]
    }, {
        nom: "cv-html",
        url: "https://test-geoloc.vercel.app/",
        thumbnail: "test-geoloc.png",
        languages: ["HTML", "CSS/SASS", "JS/React"]
    }, {
        nom: "cv-html",
        url: "https://www.sonny.dev/",
        thumbnail: "cv-html.png",
        languages: ["HTML", "CSS/SASS", "JS/React"]
    }];

    return (
        <div className="projets">
            <h1>Mes projets</h1>
            <ul className="reset">
                {projets.map(({ nom, url, thumbnail, languages }: Projet, key: number) => (
                    <li className="projet" key={key}>
                        <a href={url} target="_blank" rel="noreferrer">
                            <img src={thumbnail} alt={`${nom} thumbnail`} />
                            <div className="details">
                                <span className="languages">{languages.join(", ")}</span>
                                <span className="name">{nom}</span>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
