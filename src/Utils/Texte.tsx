import React from "react";

import { CgChevronDoubleRight } from 'react-icons/cg';

export function boldFirstChar(str: string) {
    const splitStr = str.split('');
    return (
        <><b>{splitStr.shift()}</b>{splitStr}</>
    )
}


export function List({ items }: { items: string[]; }) {
    return <ul className="reset">
        {items.map((item: any, key: number) => (
            <li key={key}><CgChevronDoubleRight /> {item}</li>
        ))}
    </ul>;
}