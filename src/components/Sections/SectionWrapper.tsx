import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../../App";
import { HandleUpdateAnchorURL } from "../../Utils/Navigation";

export interface SectionWrapperProps {
    sections: Section[];
    section: Section;
    activeSection: Section;
    setActiveSection: (section: Section) => void;
    changeBackground: (section: Section) => void;
}

export default function SectionWrapper({
    sections,
    section,
    activeSection,
    setActiveSection,
    changeBackground,
}: SectionWrapperProps) {
    const threshold = .3;
    const { component: Component, ref: refSection } = section;
    const { ref, inView, entry } = useInView({ threshold });
    const [isInView, setInView] = useState<boolean>(false);

    useEffect(() => {
        if (inView && entry?.intersectionRatio) {
            if (entry.intersectionRatio < threshold && !isInView) {
                setInView(false);
                return;
            }

            setInView(true);
            setActiveSection(section);
            changeBackground(section);

            const index = sections.findIndex(s => s.name === section.name);
            if (index === 0)
                HandleUpdateAnchorURL();
            else
                HandleUpdateAnchorURL(section.name);

        }
    }, [inView, setActiveSection, changeBackground, section, entry, isInView, sections]);

    const setRefs = useCallback((node) => {
        //@ts-ignore
        refSection.current = node;
        //@ts-ignore
        activeSection.ref.current = node;
        ref(node);
    }, [ref, refSection, activeSection]);

    return (
        <div className="section" ref={setRefs} id={section.name}>
            <Component inView={isInView} />
        </div>
    );
}
