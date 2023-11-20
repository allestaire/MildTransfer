import { Inter } from 'next/font/google'
import './globals.css'
import Wrap from './wrap'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MildTransfer',
  description: 'Transfer your favorate file to cloud with rain',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrap>
          {children}
        </Wrap>
      </body>
    </html>
  )
}
