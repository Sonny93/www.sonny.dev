import { AiFillMail } from 'react-icons/ai';
import { BsDiscord, BsGithub, BsLinkedin } from 'react-icons/bs';
import Home from '~/components/sections/01-home/home';
import AboutMe from '~/components/sections/02-aboutme/aboutme';
import Journey from '~/components/sections/03-journey/journey';
import Projects from '~/components/sections/04-projects/projects';
import Contact from '~/components/sections/05-contact/contact';
import { Section, SocialNetwork } from '~/types';

export const PATH_BG_IMG = '/img/background';
export const PATH_BG_PROJETS = '/img/projects';

export const name: string = 'Sonny';
export const email: string = 'sonnylallier1@gmail.com';

export const socialNetworks: Array<SocialNetwork> = [
  {
    id: 'github',
    link: 'https://github.com/Sonny93',
    icon: <BsGithub />,
    title: 'Profil Github',
  },
  {
    id: 'linkedin',
    link: 'https://www.linkedin.com/in/sonnylallier/',
    icon: <BsLinkedin />,
    title: 'Profil Linkedin',
  },
  {
    id: 'discord',
    link: 'https://discordapp.com/users/257285655388880896',
    icon: <BsDiscord />,
    title: 'Profil Discord',
  },
  {
    id: 'email',
    link: 'mailto:' + email,
    icon: <AiFillMail />,
    title: 'Adresse email : ' + email,
  },
];

export const sections: Section[] = [
  {
    name: 'home',
    label: 'Présentation',
    background: '1.webp',
    component: Home,
  },
  {
    name: 'aboutme',
    label: 'Compétences',
    background: '2.webp',
    component: AboutMe,
  },
  {
    name: 'experiences',
    label: 'Parcours',
    background: '3.webp',
    component: Journey,
  },
  {
    name: 'projects',
    label: 'Projets',
    background: '4.webp',
    component: Projects,
  },
  {
    name: 'contact',
    label: 'Prendre contact',
    background: '5.webp',
    component: Contact,
  },
];
