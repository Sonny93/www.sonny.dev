import { css, keyframes } from '@emotion/react';

export const styleVars = {
  lightBlack: 'rgba(0, 0, 0, 0.1)',
  black: 'rgba(0, 0, 0, 0.3)',
  darkBlack: 'rgba(0, 0, 0, 0.5)',
  white: '#fff',
  blue: '#3f88c5',
  gray: '#7c7c7c',
  borderRadius: '5px',
};

export const cssReset = css({
  '*': {
    boxSizing: 'border-box',
    outline: 0,
    margin: 0,
    padding: 0,
    scrollBehavior: 'smooth',
  },

  '.reset': {
    backgroundColor: 'inherit',
    color: 'inherit',
    padding: 0,
    margin: 0,
    border: 0,
  },

  a: {
    width: 'fit-content',
    color: '#3f88c5',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
  },

  b: {
    fontWeight: 600,
    letterSpacing: '0.5px',
  },

  'h1, h2, h3, h4, h5, h6': {
    fontWeight: '400',
    margin: '1em 0',
  },
});

export const htmlBodyStyle = css({
  'html, body, #__next': {
    height: '100svh',
    width: '100svw',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '17px',
    color: styleVars.white,
    backgroundColor: styleVars.black,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
  },
});

export const fadeTransIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-30px, 0)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(0, 0)',
  },
});

export const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});
