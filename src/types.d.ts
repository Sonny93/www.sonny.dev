export interface Section {
    name: string;
    label: string;
    background: string;
    component: any;
}

export interface SocialNetwork {
    id: 'github' | 'linkedin' | 'discord' | 'email';
    title: string;
    icon: any;
    link: string;
}