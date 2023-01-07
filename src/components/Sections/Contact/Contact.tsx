import React, { useMemo, useState } from "react";

import { email } from "../../../config";
import "./contact.scss";

export default function Contact() {
    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const canSend = useMemo<boolean>(
        () => body !== "" && subject !== "",
        [body, subject]
    );

    const encodeBody = (str: string): string => encodeURI(str);
    const openMailTo = () =>
        window
            .open(
                `mailto:${email}?subject=${subject}&body=${encodeBody(body)}`,
                "_blank"
            )
            ?.focus();

    return (
        <div className="contact">
            <h2>Me contacter</h2>
            <div className="form">
                <div className="field subject">
                    <label htmlFor="input-subject">Sujet</label>
                    <input
                        type="text"
                        id="input-subject"
                        placeholder="Quel est le sujet ?"
                        value={subject}
                        onChange={({ target }) => setSubject(target.value)}
                    />
                </div>
                <div className="field body">
                    <label htmlFor="input-body">Contenu du message</label>
                    <textarea
                        id="input-body"
                        placeholder="Quel est le contenu du message ?"
                        value={body}
                        onChange={({ target }) => setBody(target.value)}
                    />
                </div>
                <div className="field confirm">
                    <button onClick={openMailTo} disabled={!canSend}>
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}
