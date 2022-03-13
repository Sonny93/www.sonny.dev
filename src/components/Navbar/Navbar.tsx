import React, { createRef } from "react";
import { BsGithub, BsLinkedin, BsDiscord } from "react-icons/bs";

import { name } from "../../config";
import {
    MoveNavbarDot,
    ScrollToSection,
} from "../../Utils/Navigation";

import "./navbar.scss";

export interface NavbarProps {
    activeSection: any;
    sections: Array<any>;
}

export default function Navbar({ activeSection, sections }: NavbarProps) {
    const dotRef = createRef();

    function handleActiveSection(name: string, target: EventTarget) {
        if (!name) return console.error("name missing");

        const section = sections.find((s) => s.name === name);
        if (section) {
            const index = sections.findIndex((s) => s.name === name);
            if (index === -1) return;

            //@ts-ignore
            const { height } = target.getBoundingClientRect();
            MoveNavbarDot(index * height + 25, dotRef.current);

            // Scroll into view
            if (name !== activeSection.name) {
                ScrollToSection(section);
            }
        }
    }

    return (
        <div className="navbar">
            <div className="header">
                <h2>{name}</h2>
                <p>Où me retrouver ?</p>
                <ul className="find-me">
                    <li className="item">
                        <a
                            href="https://github.com/Sonny93"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <BsGithub />
                        </a>
                    </li>
                    <li className="item">
                        <a
                            href="https://linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <BsLinkedin />
                        </a>
                    </li>
                    <li className="item">
                        <a
                            href="https://discord.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <BsDiscord />
                        </a>
                    </li>
                </ul>
            </div>
            <ul className="items">
                {/*@ts-ignore*/}
                <div className="dot" ref={dotRef}></div>
                {sections.map(({ name, label }, key) => (
                    <li
                        className={
                            activeSection.name === name ? `item active` : "item"
                        }
                        onClick={({ target }) =>
                            handleActiveSection(name, target)
                        }
                        key={key}
                    >
                        {label}
                    </li>
                ))}
            </ul>
            <div className="footer">
                Copyright 2022 © <b>{name}</b>
            </div>
        </div>
    );
}
