import styled from "@emotion/styled";
import experiences from "data/experiences.json";
import formations from "data/formations.json";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import TimeRelative from "dayjs/plugin/relativeTime";
import { styleVars } from "globalStyles";
import { CgChevronDoubleRight } from "react-icons/cg";
import { Experience, Formation } from "types";
import {
  TimelineItem,
  TimelineItemDate,
  TimelineItemDateLabel,
  TimelineItemDetails,
  TimelineItemDuration,
  TimelineItemLabel,
  TimelineItemLocation,
} from "./timelist/timelineItem";

dayjs.extend(TimeRelative);

const ExperiencesWrapper = styled.div({
  display: "flex !important",
  flexDirection: "column",
});

const TimelinesWrapper = styled.div({
  display: "flex",
  "@media (max-width: 1224px)": {
    gap: "3em",
    flexDirection: "column",
  },
});

const TimelineWrapper = styled.div({
  flex: "1 1 0px",
  "@media (max-width: 1224px)": {
    marginBottom: "40px",
  },
});

const TimelineTitle = styled.h3({
  paddingLeft: "25px",
  marginTop: "0",
});

const TimelineContainer = styled.div({
  height: "fit-content",
  display: "flex",
});

const Timeline = styled.div({
  minHeight: "100%",
  minWidth: "5px",
  margin: "0 25px",
  backgroundColor: styleVars.black,
  borderRadius: styleVars.borderRadius,
});

const TimelineItems = styled.ul({
  width: "100%",
  margin: 0,
});

export default function Experiences() {
  return (
    <ExperiencesWrapper>
      <h2>Mon parcours</h2>
      <TimelinesWrapper>
        <TimelineWrapper>
          <TimelineTitle>Formations</TimelineTitle>
          <TimelineContainer>
            <Timeline />
            <TimelineItems>
              {formations.map((formation: Formation, key: number) => (
                <FormationItem key={key} {...formation} />
              ))}
            </TimelineItems>
          </TimelineContainer>
        </TimelineWrapper>
        <TimelineWrapper>
          <TimelineTitle>Expériences professionnelles</TimelineTitle>
          <TimelineContainer>
            <Timeline />
            <TimelineItems>
              {experiences.map((experience: Experience, key: number) => (
                <ExperienceItem key={key} experience={experience} />
              ))}
            </TimelineItems>
          </TimelineContainer>
        </TimelineWrapper>
      </TimelinesWrapper>
    </ExperiencesWrapper>
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
    <TimelineItem>
      <TimelineItemLabel title={details}>{details}</TimelineItemLabel>
      <TimelineItemDetails>
        <TimelineItemDate>
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
        </TimelineItemDate>
        <TimelineItemLocation>
          <CgChevronDoubleRight /> {etablissement}
          <span style={{ color: "#aaa" }}>
            {" "}
            — {ville}, {codePostal}
          </span>
        </TimelineItemLocation>
      </TimelineItemDetails>
    </TimelineItem>
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

  const duration = startDate
    .subtract(1, "day")
    .locale("fr")
    .from(endDateOrToday, true);

  return (
    <TimelineItem>
      <TimelineItemLabel title={details}>
        [{type}] {details}
      </TimelineItemLabel>
      <TimelineItemDetails>
        <TimelineItemDate>
          <TimelineItemDateLabel>{startDateFormated}</TimelineItemDateLabel>
          {" — "}
          <TimelineItemDateLabel>{endDateFormated}</TimelineItemDateLabel>
          <TimelineItemDuration>({duration})</TimelineItemDuration>
        </TimelineItemDate>
        <TimelineItemLocation>
          <CgChevronDoubleRight /> {company} —
          <span style={{ color: "#aaa" }}>
            {" "}
            {city}, {zipCode}
          </span>
        </TimelineItemLocation>
      </TimelineItemDetails>
    </TimelineItem>
  );
}
