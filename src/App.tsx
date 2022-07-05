import React, { useEffect, useState } from 'react';
import { Section } from './types';

// Components
import Navbar from './components/Navbar/Navbar';
import SectionsList from './components/Sections/SectionsList';

// Config
import { PATH_BG_IMG, sections, SectionsProvider } from './config';

export default function App() {
    const [activeSection, setActiveSection] = useState<Section>(sections[0]);
    const [background, setBackground] = useState<string>(sections[0].background);

    useEffect(() => sections.forEach(({ background }: Section) => PreloadImage(background)), []);
    useEffect(() => {
        if (activeSection) {
            setBackground(activeSection.background);
        }
    }, [activeSection]);

    const changeActiveSection = (name: string) => {
        const section = sections.find((s => s.name === name));
        if (section) {
            setActiveSection(section);
        } else {
            console.warn('Unable to find active section');
        }
    }

    return (
        <div className='background' style={{ backgroundImage: `url(${PATH_BG_IMG}/${background})` }}>
            <div className='App'>
                <SectionsProvider.Provider value={sections}>
                    <Navbar
                        setActiveSection={changeActiveSection}
                        sections={sections}
                    />
                    <SectionsList sections={sections} />
                </SectionsProvider.Provider>
            </div>
        </div>
    );
}

function PreloadImage(image: string): void {
    const link = document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'image');
    link.setAttribute('crossorigin', 'anonymous');
    link.setAttribute('href', image);
    document.head.appendChild(link);
}