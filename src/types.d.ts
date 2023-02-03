export interface Section {
    name: string;
    label: string;
    background: string;
    component: any;
    disabled?: boolean;
}

export interface SocialNetwork {
    id: "github" | "linkedin" | "discord" | "email";
    title: string;
    icon: any;
    link: string;
}

interface Projet {
    nom: string;
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
