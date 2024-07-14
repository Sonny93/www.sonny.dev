import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import TimeRelative from 'dayjs/plugin/relativeTime';
import Experiences from '~/components/sections/03-journey/experiences/experiences';
import Formations from '~/components/sections/03-journey/formations/formations';

dayjs.extend(TimeRelative);

const Journey = () => (
  <div css={{ marginBlock: '5em' }}>
    <Formations />
    <div css={{ marginTop: '5em' }}>
      <Experiences />
    </div>
  </div>
);
export default Journey;
