import styled from "@emotion/styled";
import { styleVars } from "globalStyles";

const NavbarFooter = styled.div({
  width: "250px",
  fontSize: "0.9em",
  letterSpacing: "0.5px",
  fontStyle: "italic",
  padding: "20px 0",
  borderTop: `1px solid ${styleVars.gray}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0 5px",
});

export default NavbarFooter;
