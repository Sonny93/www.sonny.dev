import React from "react";

export function boldFirstChar(str: string) {
    const splitStr = str.split('');
    return (
        <><b>{splitStr.shift()}</b>{splitStr}</>
    )
}