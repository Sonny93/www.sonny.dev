import React, { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Section } from "../../App";

export interface SectionWrapperProps {
    section: Section;
    activeSection: Section;
    setActiveSection: React.Dispatch<any>;
}

export default function SectionWrapper({
    section,
    activeSection,
    setActiveSection,
}: SectionWrapperProps) {
    const { component, ref: refSection } = section;
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView) setActiveSection(section);
    }, [inView, setActiveSection, section]);

    const setRefs = useCallback(
        (node) => {
            //@ts-ignore
            refSection.current = node;
            //@ts-ignore
            activeSection.ref.current = node;
            ref(node);
        },
        [ref, refSection, activeSection]
    );

    return (
        <div className="section" ref={setRefs} id={section.name}>
            {component}
        </div>
    );
}
