import styled from '@emotion/styled';

const NavbarWrapper = styled.div<{ isActive: boolean }>(({ isActive }) => ({
  height: '100%',
  width: 'fit-content',
  transition: '0.15s',
  '@media (max-width: calc(768px + 2em))': {
    zIndex: 9,
    position: 'absolute',
    top: 0,
    right: isActive ? 0 : '100%',
    width: '100% !important',
  },
}));

export default NavbarWrapper;
