import React from 'react';

import { CgChevronDoubleRight } from 'react-icons/cg';

import './parcours.scss';
import formations from './formations.json';
import experiences from './experiences.json';

interface FormationProps {
    dateDebut: string;
    dateFin: string;
    duree?: number;
    ville: string;
    codePostal: number;
    etablissement: string;
    details: string;
}

interface ExperiencesProps {
    dateDebut: string;
    dateFin: string;
    shortDate: string;
    ville: string;
    codePostal: number;
    entreprise: string;
    duree: number;
    details: string;
}

export default function Parcours() {
    return (
        <div className='parcours'>
            <h1>Mon parcours</h1>
            <div className='timelines-wrapper'>
                <div className='timeline-wrapper'>
                    <h2>Formations</h2>
                    <div className='timeline-container'>
                        <div className='timeline'></div>
                        <ul className='reset'>
                            {formations.map((formation: FormationProps, key: number) => (
                                <FormationItem
                                    key={key}
                                    {...formation}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='timeline-wrapper'>
                    <h2>Expériences professionnelles</h2>
                    <div className='timeline-container'>
                        <div className='timeline'></div>
                        <ul className='reset'>
                            {experiences.map((experience: ExperiencesProps, key: number) => (
                                <ExperienceItem
                                    key={key}
                                    {...experience}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormationItem({ details, dateDebut, dateFin, duree, etablissement, ville, codePostal }: FormationProps) {
    return (<>
        <li className='item'>
            <div className='label' title={details}>
                {details}
            </div>
            <div className='details'>
                <div className='date'>
                    {dateDebut === dateFin ? dateDebut : <>{dateDebut} - {dateFin}</>} {duree && (<span style={{ color: '#aaa' }}> — {duree} an{duree > 1 ? 's' : ''}</span>)}
                </div>
                <div className='location'>
                    <CgChevronDoubleRight /> {etablissement}<span style={{ color: '#aaa' }}> — {ville}, {codePostal}</span>
                </div>
            </div>
        </li>
    </>);
}

function ExperienceItem({ details, shortDate, duree, entreprise, ville, codePostal }: ExperiencesProps) {
    return (<>
        <li className='item'>
            <div className='label' title={details}>
                {details}
            </div>
            <div className='details'>
                <div className='date'>
                    {shortDate} <span style={{ color: '#aaa' }}> — {duree} semaines</span>
                </div>
                <div className='location'>
                    <CgChevronDoubleRight /> {entreprise}<span style={{ color: '#aaa' }}> — {ville}, {codePostal}</span>
                </div>
            </div>
        </li>
    </>);
}