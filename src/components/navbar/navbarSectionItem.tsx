import { ClassNames } from '@emotion/react';
import { styleVars } from '~/globalStyles';
import { useMemo } from 'react';
import { Link } from 'react-scroll';
import { Section } from '~/types';

function NavbarSectionItem({
  section,
  setActiveSection,
}: {
  section: Section;
  setActiveSection: (name: string) => void;
}) {
  const { name, label } = section;
  const offset = useMemo(
    () => (typeof window !== 'undefined' ? -(window.innerHeight / 2.75) : 0),
    []
  );

  return (
    <li>
      <ClassNames>
        {({ css }) => (
          <Link
            className={
              'reset ' +
              css({
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative',
                height: 'fit-content',
                width: '250px',
                color: '#fff',
                padding: '10px 0',
                borderRadius: styleVars.borderRadius,
                display: 'inline-block',
                transition: '0.15s',
                overflow: 'hidden',

                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  transform: 'scaleX(0)',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: styleVars.blue,
                  transformOrigin: 'bottom right',
                  transition: 'transform 0.25s ease-out',
                },

                '&:hover': {
                  background: styleVars.black,
                  letterSpacing: '1px',
                },
              })
            }
            activeClass={css({
              backgroundColor: styleVars.black,
              letterSpacing: '1px',
              '&:after': {
                transform: 'scaleX(1)',
                transformOrigin: 'bottom left',
              },
            })}
            href="#"
            smooth
            spy
            to={name}
            containerId="page-content"
            onSetActive={setActiveSection}
            offset={offset}
          >
            {label}
          </Link>
        )}
      </ClassNames>
    </li>
  );
}

export default NavbarSectionItem;
