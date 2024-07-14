import styled from '@emotion/styled';
import GitHubButton from 'react-github-btn';
import ExternalLink from '~/components/externalLink';
import projects from '~/data/projects.json';
import { styleVars } from '~/globalStyles';
import { Project } from '~/types';
import ProjectCard from './projectCard';
import {
  ProjectDescription,
  ProjectDescriptionWrapper,
} from './projectDescription';
import ProjectDetails from './projectDetails';

const SectionDescription = styled.p({
  backdropFilter: 'blur(7px)',
  background: styleVars.black,
  padding: '20px',
  borderRadius: styleVars.borderRadius,
});

const ProjectList = styled.ul({
  padding: 0,
  marginTop: '1em',
  display: 'flex',
  gap: '25px',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const Projects = () => (
  <div>
    <h2>Mes projets</h2>
    <SectionDescription>
      Voici les projets un minimum sérieux sur lesquels je travaille sur mon
      temps libre. <br />
      J'ai utilisé Github pour le versionning, et m'occupe moi-même de
      l'hébergement de ces derniers.
    </SectionDescription>
    <ProjectList>
      {projects.map((project: any) => (
        <ProjectItemCard project={project} key={project?.name} />
      ))}
    </ProjectList>
  </div>
);

const ProjectItemCard = ({ project }: { project: Project }) => (
  <ProjectCard>
    {project.url ? (
      <ExternalLink css={{ width: '100%' }} href={project.url}>
        <ProjectDetails project={project} />
      </ExternalLink>
    ) : (
      <ProjectDetails project={project} />
    )}
    <ProjectDescriptionWrapper>
      <ProjectDescription className="description">
        {project.description}
      </ProjectDescription>
      <div className="github">
        {project.github ? (
          <GitHubButton
            href={project.github}
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Voir le repo github"
          >
            Voir le repo github
          </GitHubButton>
        ) : (
          <i>Repo github non disponible</i>
        )}
      </div>
    </ProjectDescriptionWrapper>
  </ProjectCard>
);

export default Projects;
