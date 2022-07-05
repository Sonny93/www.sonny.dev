import React from 'react';
import { Section } from '../../types';

import './sections.scss';

export default function SectionsList({ sections }: { sections: Array<Section>; }): JSX.Element {
    return (
        <div className='page-content' id='page-content'>
            {sections.map((section: Section, key: number) => (
                <div className='section' key={key} id={section.name}>
                    <section.component
                        {...section}
                    />
                </div>
            ))}
        </div>
    );
}
