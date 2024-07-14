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

interface Project {
  name: string;
  description: string;
  url?: string;
  thumbnail: string;
  languages: string[];
  github?: string;
  disabled?: boolean;
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
