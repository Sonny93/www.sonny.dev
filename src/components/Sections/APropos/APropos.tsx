import React, { ReactNode } from "react";
import { FaJava } from "react-icons/fa";
import {
    SiCsharp,
    SiCss3,
    SiExpress,
    SiFastify,
    SiHtml5,
    SiJavascript,
    SiKotlin,
    SiMysql,
    SiNextdotjs,
    SiPhp,
    SiPython,
    SiReact,
    SiSass,
} from "react-icons/si";
import Tilt from "react-parallax-tilt";

import skills from "../../jsons/competences";

import { Skill } from "../../../types";
import "./apropos.scss";

interface Langage {
    label: string;
    icon: JSX.Element;
    color?: string;
}

export default function APropos() {
    const frontLangages: Langage[] = [
        {
            label: "HTML",
            icon: <SiHtml5 />,
            color: "#dd4b25",
        },
        {
            label: "CSS",
            icon: <SiCss3 />,
            color: "#146eb0",
        },
        {
            label: "SASS",
            icon: <SiSass />,
            color: "#c76494",
        },
        {
            label: "JavaScript",
            icon: <SiJavascript />,
            color: "#efd81d",
        },
        {
            label: "React",
            icon: <SiReact />,
            color: "#5ed3f3",
        },
    ];

    const backLangages: Langage[] = [
        {
            label: "Next",
            icon: <SiNextdotjs />,
            color: "#000",
        },
        {
            label: "Express",
            icon: <SiExpress />,
            color: "#464646",
        },
        {
            label: "Fastify",
            icon: <SiFastify />,
            color: "#fff",
        },
        {
            label: "PHP",
            icon: <SiPhp />,
            color: "#777BB3",
        },
        {
            label: "Kotlin",
            icon: <SiKotlin />,
            color: "#B125EA",
        },
        {
            label: "Java",
            icon: <FaJava />,
            color: "#f89820",
        },
    ];

    const otherLangages: Langage[] = [
        {
            label: "Python",
            icon: <SiPython />,
            color: "#4584b6",
        },
        {
            label: "C#",
            icon: <SiCsharp />,
            color: "#823085",
        },
        {
            label: "MySQL",
            icon: <SiMysql />,
            color: "#F29111",
        },
    ];

    return (
        <div className="about-me">
            <h2>Mes compétences</h2>
            <div className="competences">
                {skills.map(({ name, skills }) => (
                    <div className="row">
                        <h3>&#60;{name} /&#62;</h3>
                        <ul className="reset languages lang-fe">
                            {skills.map(BuildItem)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BuildItem({ label, icon, color }: Skill) {
    return (
        <LangageItem color={color}>
            {icon}
            {label}
        </LangageItem>
    );
}

function LangageItem({
    children,
    color = "",
}: {
    children: ReactNode;
    color?: string;
}) {
    return (
        <Tilt tiltReverse perspective={500}>
            <li style={{ "--lng-color": color } as any}>{children}</li>
        </Tilt>
    );
}
