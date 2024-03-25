import ExternalLink from "components/externalLink";
import { styleVars } from "globalStyles";
import { SocialNetwork } from "types";

function NavbarSocialItem({ title, link, icon }: SocialNetwork) {
  return (
    <li className="item">
      <ExternalLink
        href={link}
        title={title}
        css={{
          userSelect: "none",
          cursor: "pointer",
          borderRadius: "50%",
          padding: "7px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyCcontent: "center",
          transition: ".15s",
          "&:hover": {
            color: styleVars.white,
            background: styleVars.blue,
          },
        }}
      >
        {icon}
      </ExternalLink>
    </li>
  );
}

export default NavbarSocialItem;
