import React, { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../../App";
import { HandleUpdateAnchorURL } from "../../Utils/Navigation";

export interface SectionWrapperProps {
    section: Section;
    activeSection: Section;
    setActiveSection: (section: Section) => void;
    changeBackground: (section: Section) => void;
}

export default function SectionWrapper({
    section,
    activeSection,
    setActiveSection,
    changeBackground,
}: SectionWrapperProps) {
    const { component, ref: refSection } = section;
    const { ref, inView } = useInView({ threshold: .15 });

    useEffect(() => {
        if (inView) {
            setActiveSection(section);
            changeBackground(section);
            HandleUpdateAnchorURL(section.name);
        }
    }, [inView, setActiveSection, changeBackground, section]);

    const setRefs = useCallback((node) => {
        //@ts-ignore
        refSection.current = node;
        //@ts-ignore
        activeSection.ref.current = node;
        ref(node);
    }, [ref, refSection, activeSection]);

    return (
        <div className="section" ref={setRefs} id={section.name}>
            {component}
        </div>
    );
}
