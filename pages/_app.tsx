import '@/styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["300", "600", "700", "800"],
})

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
    <NextIntlClientProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  </>
}
