import styled from "@emotion/styled";
import Navbar from "components/navbar/navbar";
import SectionsList from "components/sections/sectionsList";
import { sections } from "config";
import { useEffect, useMemo, useState } from "react";
import { Section } from "types";
import { initializeAnalytic } from "utils/analytic";
import { buildBackgroundImageUrl } from "utils/link";

initializeAnalytic();

const Background = styled.div({
  position: "relative",
  height: "100%",
  width: "100%",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  transition: "0.275s",
  "&::before": {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    content: "''",
    backdropFilter: "brightness(0.7) blur(1em)",
  },
});

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);
  const background = useMemo<Section["background"]>(
    () => activeSection.background ?? "",
    [activeSection],
  );

  useEffect(preloadBackgrounds, []);

  const changeActiveSection = (name: string) => {
    const section = sections.find((s) => s.name === name);
    if (section) {
      setActiveSection(section);
    } else {
      console.warn("Unable to find active section");
    }
  };

  return (
    <Background
      style={{
        backgroundImage: `url(${buildBackgroundImageUrl(background)})`,
      }}
    >
      <Navbar setActiveSection={changeActiveSection} />
      <SectionsList />
    </Background>
  );
}

const preloadBackgrounds = () =>
  sections.forEach(({ background }) => preloadImage(background));

function preloadImage(image: string): void {
  const link = document.createElement("link");
  link.setAttribute("rel", "prefetch");
  link.setAttribute("as", "image");
  link.setAttribute("crossorigin", "anonymous");
  link.setAttribute("importance", "high");
  link.setAttribute("href", buildBackgroundImageUrl(image));
  document.head.appendChild(link);
}
