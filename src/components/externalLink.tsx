import { Interpolation, Theme } from '@emotion/react';
import Link, { LinkProps } from 'next/link';
import { CSSProperties, ReactNode } from 'react';

const ExternalLink = ({
  children,
  title,
  ...props
}: LinkProps & {
  children: ReactNode;
  style?: CSSProperties;
  css?: Interpolation<Theme>;
  title?: string;
}) => (
  <Link target="_blank" rel="noreferrer" title={title} {...props}>
    {children}
  </Link>
);

export default ExternalLink;
