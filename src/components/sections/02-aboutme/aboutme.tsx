import { ReactNode } from "react";
import Tilt from "react-parallax-tilt";

import skills from "data/skills";
import { Skill } from "types";

import "./aboutme.scss";

const APropos = () => (
    <div className="about-me">
        <h2>Mes compétences</h2>
        <div className="skills">
            {skills.map(({ name, skills }) => (
                <div className="row" key={name}>
                    <h3>&#60;{name} /&#62;</h3>
                    <ul className="reset languages lang-fe">
                        {skills.map(BuildItem)}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);

const BuildItem = ({ label, icon, color }: Skill) => (
    <SkillItem color={color} key={label}>
        {icon}
        {label}
    </SkillItem>
);

interface SkillItemProps {
    children: ReactNode;
    color?: string;
}
const SkillItem = ({ children, color = "" }: SkillItemProps) => (
    <Tilt tiltReverse perspective={500}>
        <li style={{ "--lng-color": color } as any}>{children}</li>
    </Tilt>
);

export default APropos;
