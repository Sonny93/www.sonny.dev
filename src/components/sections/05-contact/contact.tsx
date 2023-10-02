import { FormEvent, useMemo, useState } from "react";

import { email } from "config";
import "./contact.scss";

export default function Contact() {
  const [fields, setFields] = useState<{
    [key: string]: HTMLInputElement | null;
  }>({
    subject: null,
    body: null,
  });

  const canSend = useMemo<boolean>(() => {
    const fieldValues = Object.values(fields);
    const filledInputs = fieldValues.filter(
      (field) => field?.value.trim() !== "" && field?.checkValidity(),
    );
    return filledInputs.length === fieldValues.length;
  }, [fields]);

  const handleInputChange = (event: FormEvent) => {
    const input = event.target as HTMLInputElement;
    input.checkValidity();
    setFields((_fields) => ({
      ..._fields,
      [input.id]: input,
    }));
  };

  const handleSubmitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) {
      return alert("At least one field is missing");
    }

    const url = `mailto:${email!}?subject=${fields.subject
      ?.value}&body=${encodeURI(fields.body?.value!)}`;
    window.open(url, "_blank")?.focus();
  };

  return (
    <div className="contact">
      <h2>Me contacter</h2>
      <form
        className="form"
        onSubmit={handleSubmitContact}
        onChange={handleInputChange}
      >
        <div className="field subject">
          <label htmlFor="subject">Sujet</label>
          <input
            type="text"
            id="subject"
            placeholder="Pour quelle(s) raison(s) souhaitez-vous prendre contact ?"
            minLength={4}
            required
          />
        </div>
        <div className="field body">
          <label htmlFor="body">Contenu du message</label>
          <textarea
            id="body"
            placeholder="Détaillez votre demande :)"
            minLength={4}
            required
          />
        </div>
        <div className="field confirm">
          <button type="submit" disabled={!canSend}>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
