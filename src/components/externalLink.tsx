import { Interpolation, Theme } from "@emotion/react";
import Link, { LinkProps } from "next/link";
import { CSSProperties, ReactNode } from "react";

export default function ExternalLink({
  children,
  title,
  ...props
}: LinkProps & {
  children: ReactNode;
  style?: CSSProperties;
  css?: Interpolation<Theme>;
  title?: string;
}) {
  return (
    <Link target="_blank" rel="noreferrer" title={title} {...props}>
      {children}
    </Link>
  );
}
