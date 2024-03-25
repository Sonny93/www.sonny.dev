import styled from "@emotion/styled";
import Form from "components/form/form";
import FormField from "components/form/formField";
import FormFieldLabel from "components/form/formFieldLabel";
import FormTextarea from "components/form/formTextarea";
import { email } from "config";
import { FormEvent, useMemo, useState } from "react";

const ContactStyle = styled.div({
  display: "flex !important",
  flexDirection: "column",
});

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

    const url = `mailto:${email!}?subject=${
      fields.subject?.value
    }&body=${encodeURI(fields.body?.value!)}`;
    window.open(url, "_blank")?.focus();
  };

  return (
    <ContactStyle>
      <h2>Me contacter</h2>
      <Form onSubmit={handleSubmitContact} onChange={handleInputChange}>
        <FormField>
          <FormFieldLabel htmlFor="subject">Sujet</FormFieldLabel>
          <input
            type="text"
            id="subject"
            placeholder="Pour quelle(s) raison(s) souhaitez-vous prendre contact ?"
            minLength={4}
            required
          />
        </FormField>
        <FormField css={{ flex: 1 }}>
          <FormFieldLabel htmlFor="body">Contenu du message</FormFieldLabel>
          <FormTextarea
            id="body"
            placeholder="Détaillez votre demande :)"
            minLength={4}
            required
          />
        </FormField>
        <FormField css={{ alignItems: "center" }}>
          <button type="submit" disabled={!canSend}>
            Envoyer
          </button>
        </FormField>
      </Form>
    </ContactStyle>
  );
}
