import { BsGithub } from "react-icons/bs";

import projects from "data/projects.json";
import { Project } from "types";

import ProjectItem from "./projectItem";

import "./projects.scss";

const Projects = () => (
    <div className="projects">
        <h2>Mes projets</h2>
        <p className="box">
            Ci-dessous la liste des projets que j'ai réalisé sur mon temps
            libre.
            <br />
            J'ai utilisé Github pour le versionning, et m'occupe moi-même de
            l'hébergement des ces derniers.
        </p>
        <ul className="reset">
            {projects.map((project: Project, key: number) => (
                <ProjectItemCard project={project} key={key} />
            ))}
        </ul>
    </div>
);

const ProjectItemCard = ({ project }: { project: Project }) => (
    <li className="projet">
        <ProjectItem project={project} />
        <div className="description">
            <div className="details-description">{project.description}</div>
            <div className="github">
                {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                        <BsGithub /> Github
                    </a>
                ) : (
                    <i>Github non disponible</i>
                )}
            </div>
        </div>
    </li>
);

export default Projects;
