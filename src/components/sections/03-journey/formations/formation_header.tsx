import Distinction from '~/components/sections/03-journey/formations/distinction';
import { Formation } from '~/data/formations';

const FormationHeader = ({ degree, title, distinction }: Formation) => (
  <span>
    <b>{degree}</b> <span dangerouslySetInnerHTML={{ __html: title }} />{' '}
    {distinction && <Distinction>{distinction}</Distinction>}
  </span>
);

export default FormationHeader;
