import styled from "@emotion/styled";
import Navbar from "components/navbar/navbar";
import SectionsList from "components/sections/sectionsList";
import { sections } from "config";
import Head from "next/head";
import { useMemo, useState } from "react";
import { Section } from "types";
import { buildBackgroundImageUrl } from "utils/link";

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
      <PreloadBackgrounds />
      <Navbar setActiveSection={changeActiveSection} />
      <SectionsList />
    </Background>
  );
}

const PreloadBackgrounds = () => (
  <Head>
    {sections.map(({ background }) => (
      <link
        rel="prefetch"
        as="image"
        crossOrigin="anonymous"
        href={buildBackgroundImageUrl(background)}
        key={background}
      />
    ))}
  </Head>
);
