import styled from '@emotion/styled';
import FormationDetails from '~/components/sections/03-journey/formations/formation_details';
import FormationHeader from '~/components/sections/03-journey/formations/formation_header';
import { Formation } from '~/data/formations';

const FormationItemStyle = styled.li({
  width: 'fit-content',
  fontWeight: 300,
  letterSpacing: '2px',
  display: 'flex',
  gap: '0.35em',
  justifyContent: 'center',
  flexDirection: 'column',
});

const FormationItem = (formation: Formation) => (
  <FormationItemStyle>
    <FormationHeader {...formation} />
    <FormationDetails {...formation} />
  </FormationItemStyle>
);

export default FormationItem;
