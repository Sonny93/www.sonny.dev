import styled from "@emotion/styled";
import { styleVars } from "globalStyles";

const BtnNavbarMenu = styled.div({
  zIndex: 99999,
  position: "absolute",
  top: "0.25em",
  right: "0.5em",
  height: "fit-content",
  width: "fit-content",
  fontSize: "2.5em",
  backgroundColor: styleVars.darkBlack,
  padding: "0.25em",
  borderRadius: styleVars.borderRadius,
  display: "none",
  "@media (max-width: calc(768px + 2em))": {
    display: "flex",
  },
});

export default BtnNavbarMenu;
