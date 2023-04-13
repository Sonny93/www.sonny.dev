import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";

import "styles/index.scss";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    throw new Error("Unable to find #root element");
}
