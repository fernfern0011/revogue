'use client'
import './globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
import TopNavigation from './layout/TopNavigation'
import Footer from './layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <body className={inter.className}>
      <TopNavigation />
      <div>{children}</div>
      <Footer />
    </body>
  )
}
