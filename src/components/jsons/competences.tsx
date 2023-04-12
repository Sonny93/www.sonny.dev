import { FaJava } from "react-icons/fa";
import {
    SiCsharp,
    SiCss3,
    SiDocker,
    SiFastify,
    SiHtml5,
    SiJavascript,
    SiKotlin,
    SiKubernetes,
    SiMysql,
    SiNextdotjs,
    SiPhp,
    SiReact,
    SiSass,
    SiSpringboot,
} from "react-icons/si";
import { SkillSection } from "../../types";

const frontSkills: SkillSection = {
    name: "FrontEnd",
    skills: [
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
    ],
};

const backendSkills: SkillSection = {
    name: "BackEnd",
    skills: [
        {
            label: "Next",
            icon: <SiNextdotjs />,
            color: "#000",
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
            label: "C#",
            icon: <SiCsharp />,
            color: "#823085",
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
        {
            label: "Spring Boot",
            icon: <SiSpringboot />,
            color: "#6cb52d",
        },
    ],
};

const dbSkill: SkillSection = {
    name: "Base_de_données-SGBD",
    skills: [
        {
            label: "MySQL",
            icon: <SiMysql />,
            color: "#F29111",
        },
    ],
};

const devopsSkill: SkillSection = {
    name: "DevOps-Admin_Sys",
    skills: [
        { label: "Docker", icon: <SiDocker />, color: "#0fb6ec" },
        {
            label: "Kubernetes",
            icon: <SiKubernetes />,
            color: "#2e6de7",
        },
    ],
};

export default [frontSkills, backendSkills, dbSkill, devopsSkill];
