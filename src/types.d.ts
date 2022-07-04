export interface Section {
    name: string;
    label: string;
    background: string;
    component: any;
    ref: React.RefObject<HTMLDivElement>;
}