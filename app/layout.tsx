import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/ui/nav/Navbar';
import Footer from './components/ui/footer/Footer'
import { CartProvider } from './context/cartContext'
import { WishlistProvider } from './context/wishlistContext'
import { AuthProvider } from './context/authContext'
import { OrderProvider } from './context/orderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taste of Africa',
  description: 'African cuisine at your doorstep',
  icons: {
    icon: '/3.ico',
    shortcut: '/3.ico',
    apple: '/3.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/3.ico',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}