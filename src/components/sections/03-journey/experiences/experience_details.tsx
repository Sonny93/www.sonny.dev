import { Experience } from '~/data/experiences';
import { formatShortDate } from '~/utils/date';

const ExperienceDetails = ({
  beginningDate,
  endDate,
  company,
  city,
}: Experience) => (
  <span>
    {formatShortDate(beginningDate)} - {formatShortDate(endDate)} (
    <b>{company.toUpperCase()}</b> - {city.toUpperCase()})
  </span>
);

export default ExperienceDetails;
