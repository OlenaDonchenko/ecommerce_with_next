import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { ProductsProvider } from '@/context/ProductsContext';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'welcome to our website',
  description: 'this is an eCommerce build by nextjs',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ProductsProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ProductsProvider>
      </body>
    </html>
  );
}
