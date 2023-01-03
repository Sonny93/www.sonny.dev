import React from "react";

import "./apropos.scss";

import {
    SiCsharp,
    SiCss3,
    SiExpress,
    SiFastify,
    SiHtml5,
    SiJavascript,
    SiMysql,
    SiNextdotjs,
    SiPhp,
    SiPython,
    SiReact,
    SiSass,
} from "react-icons/si";

export default function APropos() {
    return (
        <div className="about-me">
            <h2>Mes compétences</h2>
            <div className="competences">
                <div className="row">
                    <h3>&#60;FrontEnd /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        <li>
                            <SiHtml5 /> HTML
                        </li>
                        <li>
                            <SiCss3 /> CSS
                        </li>
                        <li>
                            <SiSass /> SASS
                        </li>
                        <li>
                            <SiJavascript /> JavaScript
                        </li>
                        <li>
                            <SiReact /> React
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <h3>&#60;BackEnd /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        <li>
                            <SiNextdotjs /> Next
                        </li>
                        <li>
                            <SiExpress /> Express
                        </li>
                        <li>
                            <SiFastify /> Fastify
                        </li>
                        <li>
                            <SiPhp /> PHP
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <h3>&#60;Autres /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        <li>
                            <SiPython /> Python
                        </li>
                        <li>
                            <SiCsharp /> C#
                        </li>
                        <li>
                            <SiMysql /> MySQL
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
