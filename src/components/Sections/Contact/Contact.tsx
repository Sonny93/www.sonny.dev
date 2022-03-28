import React, { useEffect, useState } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { email } from '../../../config';
import './contact.scss';

export default function Contact() {
    const [subject, setSubject] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [canSend, setCanSend] = useState<boolean>(false);

    useEffect(() => setCanSend(() => body && subject ? true : false), [body, subject]);

    const confirmOpenMailto = () => {
        confirmAlert({
            title: "Envoyer un mail",
            message: `Vous êtes sur le point d'ouvrir une boîte de dialogue afin d'envoyer un mail à ${email}.\n\nSouhaitez vous continuer ?`,
            buttons: [{
                label: 'Oui',
                onClick: () => openMailTo()
            }, {
                label: 'Non',
                onClick: () => { }
            }]
        });
    }


    const encodeBody = (str: string): string => encodeURI(str);
    const openMailTo = () => window.open(`mailto:${email}?subject=${subject}&body=${encodeBody(body)}`, '_blank')?.focus();

    return (
        <div className="contact">
            <h1>
                Me contacter
            </h1>
            <div className="form">
                <div className="field subject">
                    <label htmlFor="input-subject">
                        Sujet
                    </label>
                    <input
                        type="text"
                        id="input-subject"
                        placeholder="Quel est le sujet ?"
                        value={subject}
                        onChange={({ target }) => setSubject(target.value)}
                    />
                </div>
                <div className="field body">
                    <label htmlFor="input-body">
                        Contenu du message
                    </label>
                    <textarea
                        id="input-body"
                        placeholder="Quel est le contenu du message ?"
                        value={body}
                        onChange={({ target }) => setBody(target.value)}
                    />
                </div>
                <div className="field confirm">
                    <button onClick={confirmOpenMailto} disabled={!canSend}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}
