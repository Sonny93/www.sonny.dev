import React, { useEffect, useState } from 'react';

import { Section } from '../../types';
import { HandleUpdateAnchorURL } from '../../Utils/Navigation';

export interface SectionWrapperProps {
    section: Section;
    listScrollTop: number;
    setActiveSection: (section: Section) => void;
}

export default function SectionWrapper({
    section,
    listScrollTop,
    setActiveSection
}: SectionWrapperProps) {
    const { name, component: Component, ref } = section;
    const [isInView, setInView] = useState<boolean>(false);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const offset = element.offsetTop;
        const height = element.offsetHeight;

        if (listScrollTop >= offset && listScrollTop < offset + height) {
            setActiveSection(section);
            HandleUpdateAnchorURL(name);
            setInView(true);
        } else {
            setInView(false);
        }
    }, [name, ref, listScrollTop, setActiveSection, section]);

    return (
        <div className='section' ref={ref} id={section.name}>
            <Component inView={isInView} />
        </div>
    );
}
