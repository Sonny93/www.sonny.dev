import { Formation } from '~/data/formations';
import { formatShortDate } from '~/utils/date';

const FormationDetails = ({
  beginningDate,
  endDate,
  school,
  city,
}: Formation) => (
  <span>
    {formatShortDate(beginningDate)} - {formatShortDate(endDate)} (
    <b>{school}</b> - {city.toUpperCase()})
  </span>
);

export default FormationDetails;
