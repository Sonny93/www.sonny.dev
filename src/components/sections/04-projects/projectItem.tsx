import { buildProjectImageUrl } from "@/utils/link";
import { ReactNode } from "react";
import { Project } from "types";

interface ProjectItemProps {
    project: Project;
}
const ProjectItem = ({ project }: ProjectItemProps) =>
    project.url ? (
        <ProjectLink url={project.url}>
            <ProjectItemBody project={project} />
        </ProjectLink>
    ) : (
        <div className="direct-link">
            <ProjectItemBody project={project} />
        </div>
    );

interface ProjectLinkProps {
    url: Project["url"];
    children: ReactNode;
}
const ProjectLink = ({ url, children }: ProjectLinkProps) => (
    <a className="direct-link" href={url} target="_blank" rel="noreferrer">
        {children}
    </a>
);

const ProjectItemBody = ({ project }: ProjectItemProps) => (
    <>
        <img
            src={buildProjectImageUrl(project.thumbnail)}
            alt={`${project.name} thumbnail`}
        />
        <div className="details">
            <span className="languages">{project.languages.join(", ")}</span>
            <span className="name">{project.name}</span>
        </div>
    </>
);

export default ProjectItem;
