export interface Section {
    name: string;
    label: string;
    background: string;
    component: any;
}

export interface SocialNetwork {
    id: "github" | "linkedin" | "discord" | "email";
    title: string;
    icon: any;
    link: string;
}

interface Project {
    name: string;
    description: string;
    url?: string;
    thumbnail: string;
    languages: string[];
    github?: string;
    disabled?: boolean;
}

interface Formation {
    dateDebut: string;
    dateFin: string;
    duree?: number;
    ville: string;
    codePostal: number;
    etablissement: string;
    details: string;
}

interface Experience {
    date: {
        start: string;
        end: string | null;
    };

    city: string;
    zipCode: number;
    company: string;

    details: string;
    type: string;
}

export interface SkillSection {
    name: string;
    skills: Skills;
}

export interface Skill {
    label: string;
    icon: JSX.Element;
    color?: string;
}

export type Skills = Skill[];
