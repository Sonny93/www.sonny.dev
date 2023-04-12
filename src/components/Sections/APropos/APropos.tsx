import { ReactNode } from "react";
import Tilt from "react-parallax-tilt";

import { Skill } from "../../../types";
import skills from "../../jsons/competences";

import "./apropos.scss";

export default function APropos() {
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
        <SkillItem color={color}>
            {icon}
            {label}
        </SkillItem>
    );
}

function SkillItem({
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
