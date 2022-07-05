import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

import { Section } from '../../../types';
import { name, SectionsProvider } from '../../../config';

import Avatar from '../../Avatar';

import './accueil.scss';

export default function AccueilWrapper() {
    return (
        <SectionsProvider.Consumer>
            {(value) => <Accueil sections={value} />}
        </SectionsProvider.Consumer>
    );
}

interface AccueilProps {
    sections: Array<Section>;
}

function Accueil({ sections }: AccueilProps): JSX.Element {
    const [nextSection, setNextSection] = useState<Section | undefined>(undefined);

    useEffect(() => {
        if (sections.length > 1) {
            setNextSection(sections[1]);
        }
    }, [sections]);

    return (
        <div className='accueil'>
            <Avatar size={240} />
            <h2>{name} ✌️</h2>
            <h1>
                Développeur <span className='type'>Fullstack</span>
            </h1>
            <p>Étudiant de 19 ans en deuxième année de <b>BTS SIO</b> (Option <b>SLAM</b>)</p>
            {nextSection && (
                <div className='wrapper-scroll'>
                    <Link
                        smooth
                        to={nextSection.name}
                        containerId='page-content'
                    >
                        <ScrollMouse />
                    </Link>
                    <p>Défiler pour voir la suite !</p>
                </div>
            )}
        </div>
    );
}

const ScrollMouse = (): JSX.Element => (
    <span className='scroll-icon'>
        <span className='scroll-icon__dot'></span>
    </span>
);