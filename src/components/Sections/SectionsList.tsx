import { Section } from "types";

import "./sections.scss";

interface SectionsListProps {
    sections: Array<Section>;
}
export default function SectionsList({
    sections,
}: SectionsListProps): JSX.Element {
    return (
        <div className="page-content" id="page-content">
            {sections.map((section: Section, key: number) => (
                <div className="section" key={key} id={section.name}>
                    <section.component {...section} />
                </div>
            ))}
        </div>
    );
}
