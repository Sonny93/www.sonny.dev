import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '~/styles/index.scss';

const umamiId = process.env.UMAMI_ID;
const umamiScriptUrl = 'https://umami.sonnydata.fr/script.js';

export default function Application({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  return (
    <>
      <DefaultSeo
        titleTemplate="Portfolio — %s"
        defaultTitle="Portfolio — Sonny Lallier"
        description="Mon parcours, mes expériences et mes projets"
        openGraph={{
          type: 'website',
          locale: locale,
          siteName: 'Sonny LALLIER',
          description: 'Mon parcours, mes expériences et mes projets',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {umamiId && (
          <script src={umamiScriptUrl} async defer data-website-id={umamiId} />
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
