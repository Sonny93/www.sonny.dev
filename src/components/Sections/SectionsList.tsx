import React from 'react';
import { Section } from '../../types';

import SectionWrapper from './SectionWrapper';
import './sections.scss';

export interface SectionsProps {
    sections: Array<Section>;
    activeSection: Section;
    setActiveSection: (section: Section) => void;
    changeBackground: (section: Section) => void;
}

export default function SectionsList({
    sections,
    activeSection,
    setActiveSection,
    changeBackground,
}: SectionsProps) {
    return (
        <div className='page-content'>
            {sections.map((section: Section, key: number) => (
                <SectionWrapper
                    key={key}
                    sections={sections}
                    section={section}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    changeBackground={changeBackground}
                />
            ))}
        </div>
    );
}
