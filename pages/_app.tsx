import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["300", "600", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <NextIntlClientProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </>
  );
}
