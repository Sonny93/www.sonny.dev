import styled from "@emotion/styled";
import { styleVars } from "globalStyles";
import { Project } from "types";
import { buildProjectImageUrl } from "utils/link";

export const ProjectDetailsStyle = styled.div({
  height: "100%",
  width: "430px",
  gap: "15px",
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  flexDirection: "column",
  transition: "0.25s",

  "@media (max-width: 1224px)": {
    width: "100%",
  },
});

const ProjectThumbnail = styled.img({
  height: "auto",
  width: "100%",
  objectFit: "cover",
  borderRadius: styleVars.borderRadius,
  transition: "0.15s",
});

const ProjectDetailsContent = styled.div({
  height: "fit-content",
  width: "100%",
  color: styleVars.white,
  backgroundColor: styleVars.black,
  backdropFilter: "blur(4px)",
  padding: "10px",
  borderRadius: styleVars.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  transition: "0.15s",
});

const ProjectName = styled.span({
  color: styleVars.white,
  backgroundColor: styleVars.blue,
  padding: "5px 10px",
  marginTop: "2px",
  borderRadius: "3px",
  border: `1px solid ${styleVars.blue}`,
});

const ProjectDetails = ({ project }: { project: Project }) => (
  <ProjectDetailsStyle className="details-wrapper">
    <ProjectThumbnail
      src={buildProjectImageUrl(project.thumbnail)}
      alt={`${project.name} thumbnail`}
      height={242}
      width={430}
    />
    <ProjectDetailsContent className="details">
      <span className="languages">{project.languages.join(", ")}</span>
      <ProjectName>{project.name}</ProjectName>
    </ProjectDetailsContent>
  </ProjectDetailsStyle>
);

export default ProjectDetails;
