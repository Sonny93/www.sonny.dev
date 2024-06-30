export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`./locales/${context.locale}.json`)).default,
    },
  };
}
