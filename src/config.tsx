import React from "react";
import { BsGithub, BsLinkedin, BsDiscord } from "react-icons/bs";

export const name: string = "Sonny NLN";
export const email: string = "sonny@gmail.com";
export const findMe: Array<{ icon: any, link: string }> = [
    {
        link: "https://github.com/Sonny93",
        icon: <BsGithub />
    }, {
        link: "https://linkedin.com/",
        icon: <BsLinkedin />
    }, {
        link: "https://discord.com/",
        icon: <BsDiscord />
    }
];