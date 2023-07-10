import { useEffect, useMemo, useState } from "react";

import Navbar from "components/navbar/navbar";
import SectionsList from "components/sections/sectionsList";

import { sections, SectionsProvider } from "config";
import { Section } from "types";

import { buildBackgroundImageUrl } from "utils/link";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(sections[0]);
  const background = useMemo<Section["background"]>(
    () => activeSection.background || "",
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
    <div
      className="background"
      style={{
        backgroundImage: `url(${buildBackgroundImageUrl(background)}`,
      }}
    >
      <div className="App">
        <SectionsProvider.Provider value={sections}>
          <Navbar setActiveSection={changeActiveSection} sections={sections} />
          <SectionsList sections={sections} />
        </SectionsProvider.Provider>
      </div>
    </div>
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
