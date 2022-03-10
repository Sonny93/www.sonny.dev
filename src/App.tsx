import React, { createRef, useState } from "react";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";

// Sections
import Sections from "./components/Sections/Sections";

import Accueil from "./components/Sections/Accueil/Accueil";
import APropos from "./components/Sections/APropos/APropos";
import BTS from "./components/Sections/BTS/BTS";
import Parcours from "./components/Sections/Parcours/Parcours";
import Projets from "./components/Sections/Projets/Projets";
import VeilleTechnologique from "./components/Sections/VeilleTechno/Veilles";
import Contact from "./components/Sections/Contact/Contact";

export interface Section {
	name: string
	component: JSX.Element,
	ref: React.RefObject<any>
}

export default function App() {
	const [sections] = useState<Array<Section>>([
		{
			name: "accueil",
			component: <Accueil />,
			ref: createRef(),
		},
		{
			name: "aboutme",
			component: <APropos />,
			ref: createRef(),
		},
		{
			name: "btssio",
			component: <BTS />,
			ref: createRef(),
		},
		{
			name: "parcours",
			component: <Parcours />,
			ref: createRef(),
		},
		{
			name: "projets",
			component: <Projets />,
			ref: createRef(),
		},
		{
			name: "veilletechno",
			component: <VeilleTechnologique />,
			ref: createRef(),
		},
		{
			name: "contact",
			component: <Contact />,
			ref: createRef(),
		},
	]);
	const [activeSection, setActiveSection] = useState<Section>(sections[0]);

	return (
		<div className="App">
			<Navbar
				activeSection={activeSection}
				sections={sections}
			/>
			<Sections
				sections={sections}
				activeSection={activeSection}
				setActiveSection={setActiveSection}
			/>
		</div>
	);
}