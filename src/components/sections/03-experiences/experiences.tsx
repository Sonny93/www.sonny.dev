import { CgChevronDoubleRight } from "react-icons/cg";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import TimeRelative from "dayjs/plugin/relativeTime";

import experiences from "data/experiences.json";
import formations from "data/formations.json";

import { Experience, Formation } from "types";

import "./experiences.scss";

dayjs.extend(TimeRelative);

export default function Experiences() {
  return (
    <div className="experiences">
      <h2>Mon parcours</h2>
      <div className="timelines-wrapper">
        <div className="timeline-wrapper">
          <h3>Formations</h3>
          <div className="timeline-container">
            <div className="timeline"></div>
            <ul className="reset">
              {formations.map((formation: Formation, key: number) => (
                <FormationItem key={key} {...formation} />
              ))}
            </ul>
          </div>
        </div>
        <div className="timeline-wrapper">
          <h3>Expériences professionnelles</h3>
          <div className="timeline-container">
            <div className="timeline"></div>
            <ul className="reset">
              {experiences.map((experience: Experience, key: number) => (
                <ExperienceItem key={key} experience={experience} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormationItem({
  details,
  dateDebut,
  dateFin,
  duree,
  etablissement,
  ville,
  codePostal,
}: Formation) {
  return (
    <>
      <li className="item">
        <div className="label" title={details}>
          {details}
        </div>
        <div className="details">
          <div className="date">
            {dateDebut === dateFin ? (
              dateDebut
            ) : (
              <>
                {dateDebut} - {dateFin}
              </>
            )}{" "}
            {duree && (
              <span style={{ color: "#aaa" }}>
                {" "}
                — {duree} an{duree > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="location">
            <CgChevronDoubleRight /> {etablissement}
            <span style={{ color: "#aaa" }}>
              {" "}
              — {ville}, {codePostal}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}

const SHORT_DATE_FORMAT = "MMM YYYY";
function ExperienceItem({ experience }: { experience: Experience }) {
  const { details, date, company, city, zipCode, type } = experience;
  const startDate = dayjs(date.start);
  const endDateOrToday = dayjs(date.end || Date.now());

  const startDateFormated = startDate.locale("fr").format(SHORT_DATE_FORMAT);
  const endDateFormated = date.end
    ? endDateOrToday.locale("fr").format(SHORT_DATE_FORMAT)
    : "Aujourd'hui";

  const duration = startDate.locale("fr").from(endDateOrToday, true);

  return (
    <li className="item">
      <div className="label" title={details}>
        [{type}] {details}
      </div>
      <div className="details">
        <div className="date">
          <div className="start" style={{ textTransform: "capitalize" }}>
            {startDateFormated}
          </div>
          {" — "}
          <div className="end" style={{ textTransform: "capitalize" }}>
            {endDateFormated}
          </div>
          <div className="duration">({duration})</div>
        </div>
        <div className="location">
          <CgChevronDoubleRight /> {company} —
          <span style={{ color: "#aaa" }}>
            {" "}
            {city}, {zipCode}
          </span>
        </div>
      </div>
    </li>
  );
}
