import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";

import "styles/index.scss";

export default function Application({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <>
      <DefaultSeo
        titleTemplate="Portfolio — %s"
        defaultTitle="Portfolio — Sonny Lallier"
        description="Mon parcours, mes expériences et mes projets"
        openGraph={{
          type: "website",
          locale: locale,
          siteName: "Sonny LALLIER",
          description: "Mon parcours, mes expériences et mes projets",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
