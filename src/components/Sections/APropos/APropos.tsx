import React from 'react';

import { name } from '../../../config';
import "./apropos.scss";

import { BsCodeSlash } from 'react-icons/bs';
import {
    SiHtml5,
    SiCss3,
    SiSass,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiExpress,
    SiFastify,
    SiPhp,
    SiPython,
    SiCsharp,
    SiMysql
} from 'react-icons/si';

export default function APropos() {
    return (
        <div className="about-me">
            <h2>Mes compétences</h2>
            <div className="box competences">
                <div className="row">
                    <h3><BsCodeSlash /> Languages Front End</h3>
                    <ul className="reset languages lang-fe">
                        <li><SiHtml5 /> HTML</li>
                        <li><SiCss3 /> CSS</li>
                        <li><SiSass /> SASS</li>
                        <li><SiJavascript /> JavaScript</li>
                        <li><SiReact /> React</li>
                    </ul>
                </div>
                <div className="row">
                    <h3><BsCodeSlash /> Languages Back End</h3>
                    <ul className="reset languages lang-fe">
                        <li><SiNextdotjs /> Next</li>
                        <li><SiExpress /> Express</li>
                        <li><SiFastify /> Fastify</li>
                        <li><SiPhp /> PHP</li>
                    </ul>
                </div>
                <div className="row">
                    <h3><BsCodeSlash /> Autres</h3>
                    <ul className="reset languages lang-fe">
                        <li><SiPython /> Python</li>
                        <li><SiCsharp /> C#</li>
                        <li><SiMysql /> MySQL</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
