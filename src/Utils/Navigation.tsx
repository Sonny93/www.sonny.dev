import { Section } from '../types';

export function HandleUpdateAnchorURL(anchor?: string): void {
    const url = window.location.origin + (anchor ? `/#${anchor}` : '');
    window.history.pushState({}, '', url);
}

export function MoveNavbarDot(offset: number, target: any) {
    if (target) {
        target.style.transform = `translate(285px, ${offset}px)`;
    }
}

export function ScrollToSection(section: Section) {
    section.ref.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    });
}