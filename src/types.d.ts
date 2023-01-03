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
    url: string;
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
    dateDebut: string;
    dateFin: string;
    shortDate: string;
    ville: string;
    codePostal: number;
    entreprise: string;
    duree: number;
    details: string;
}
