import { Global } from '@emotion/react';
import { cssReset, htmlBodyStyle } from '~/globalStyles';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="theme-color" content="#000000" />
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/sept.jpg" type="image/x-icon" />
      </Head>
      <Global styles={cssReset} />
      <Global styles={htmlBodyStyle} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
