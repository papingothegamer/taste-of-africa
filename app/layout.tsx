import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/ui/nav/Navbar';
import Footer from './components/ui/footer/Footer'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Taste Of Africa',
  description: 'Web shop for African goods in Lodz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'${inter.className} text-slate-700'}>
      <div className= "flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow"> {children} </main>
      <Footer/>
      </div>
      </body>
    </html>
  )
}
