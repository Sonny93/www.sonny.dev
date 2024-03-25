import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { styleVars } from "globalStyles";

const fadeInLeft = keyframes({
  "0%": {
    opacity: 0,
    transform: "translate(-100%, 0)",
  },
  "100%": {
    opacity: 1,
    transform: "translate(0, 0)",
  },
});

const NavbarStyle = styled.div({
  height: "100%",
  width: "300px",
  textAlign: "center",
  backdropFilter: "blur(1em)",
  background: styleVars.black,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  transition: "0.15s",
  animation: `0.5s ${fadeInLeft} both`,
  "@media (max-width: calc(768px + 2em))": {
    backgroundColor: styleVars.darkBlack,
    boxShadow: `0 0 10px 4px ${styleVars.black}`,
  },
});

export default NavbarStyle;
