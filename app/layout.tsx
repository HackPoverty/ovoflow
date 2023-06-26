import './globals.css'
import {Poppins} from 'next/font/google'

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "300", "600", "700", "800"],
})

export const metadata = {
  title: "Ovoflow"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}