import React, { ReactNode } from "react";
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
import Tilt from "react-parallax-tilt";

import "./apropos.scss";

interface Langage {
    label: string;
    icon: JSX.Element;
}

export default function APropos() {
    const frontLangages: Langage[] = [
        {
            label: "HTML",
            icon: <SiHtml5 />,
        },
        {
            label: "CSS",
            icon: <SiCss3 />,
        },
        {
            label: "SASS",
            icon: <SiSass />,
        },
        {
            label: "JavaScript",
            icon: <SiJavascript />,
        },
        {
            label: "React",
            icon: <SiReact />,
        },
    ];

    const backLangages: Langage[] = [
        {
            label: "Next",
            icon: <SiNextdotjs />,
        },
        {
            label: "Express",
            icon: <SiExpress />,
        },
        {
            label: "Fastify",
            icon: <SiFastify />,
        },
        {
            label: "PHP",
            icon: <SiPhp />,
        },
    ];

    const otherLangages: Langage[] = [
        {
            label: "Python",
            icon: <SiPython />,
        },
        {
            label: "C#",
            icon: <SiCsharp />,
        },
        {
            label: "MySQL",
            icon: <SiMysql />,
        },
    ];

    return (
        <div className="about-me">
            <h2>Mes compétences</h2>
            <div className="competences">
                <div className="row">
                    <h3>&#60;FrontEnd /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        {frontLangages.map(BuildItem)}
                    </ul>
                </div>
                <div className="row">
                    <h3>&#60;BackEnd /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        {backLangages.map(BuildItem)}
                    </ul>
                </div>
                <div className="row">
                    <h3>&#60;Autres /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        {otherLangages.map(BuildItem)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function BuildItem({ label, icon }: Langage) {
    return (
        <LangageItem>
            {icon}
            {label}
        </LangageItem>
    );
}

function LangageItem({ children }: { children: ReactNode }) {
    return (
        <Tilt tiltReverse perspective={500}>
            <li>{children}</li>
        </Tilt>
    );
}
