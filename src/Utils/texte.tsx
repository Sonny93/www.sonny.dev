import React, { ReactElement } from "react";

import { CgChevronDoubleRight } from 'react-icons/cg';

export function boldFirstChar(str: string) {
    const splitStr = str.split('');
    return (
        <><b>{splitStr.shift()}</b>{splitStr}</>
    )
}

interface ListProps {
    title?: string;
    titleIcon?: ReactElement;
    listClassName?: string;
    items: string[] | ReactElement[];
    itemClass?: string;
    itemIconEnabled?: boolean;
}

export function List({
    title,
    titleIcon,
    listClassName,
    items,
    itemClass,
    itemIconEnabled = true
}: ListProps) {
    const className = 'reset' + (listClassName ? 'listClassName' : '');
    return (<>
        {title && <h3>{titleIcon} {title}</h3>}
        <ul className={className}>
            {items.map((item: any, key: number) => (
                <li key={key} className={itemClass}>
                    {itemIconEnabled && <CgChevronDoubleRight />} {item}
                </li>
            ))}
        </ul>
    </>);
}