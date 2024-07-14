import type { PropsWithChildren } from 'react';

const Distinction = ({ children }: PropsWithChildren) => (
  <>
    {' '}
    (<b>{children}</b>)
  </>
);
export default Distinction;
