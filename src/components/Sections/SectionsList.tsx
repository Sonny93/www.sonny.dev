import React, { useState } from 'react';
import { Section } from '../../types';

import './sections.scss';
import SectionWrapper from './SectionWrapper';

export interface SectionsProps {
    sections: Array<Section>;
    setActiveSection: (section: Section) => void;
}

export default function SectionsList({
    sections,
    setActiveSection
}: SectionsProps) {
    const [listScrollTop, setListScrollTop] = useState<number>(0);

    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) =>
        setListScrollTop(event.currentTarget.scrollTop);

    return (
        <div className='page-content' onScroll={handleScroll}>
            {sections.map((section: Section, key: number) => (
                <SectionWrapper
                    key={key}
                    section={section}
                    listScrollTop={listScrollTop}
                    setActiveSection={setActiveSection}
                />
            ))}
        </div>
    );
}
