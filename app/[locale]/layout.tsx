import { useLocale } from 'next-intl'
import { Poppins } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import '../globals.css'

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["300", "600", "700", "800"],
})

export const metadata = {
  title: "Ovoflow"
}

type Props = {
  children: ReactNode,
  params: {
    locale: string,
  }
}


export default function RootLayout({ children, params }: Props) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}