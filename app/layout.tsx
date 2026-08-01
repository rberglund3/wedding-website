import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-website-mu-nine.vercel.app/'),
  title: "Rita & Wesley | May 29, 2027",
  description: "Join us for our wedding celebration in New York City.",
  openGraph: {
    title: "The Wedding of Rita & Wesley",
    description: "May 29, 2027 — Flowerfield",
    url: 'https://wedding-website-mu-nine.vercel.app/',
    siteName: 'Rita and Wesley Wedding',
    images: [
      {
        url: '/images/363545_KW_306.jpg',
        width: 1200,
        height: 630,
        alt: 'Rita and Wesley under the Tokyo arch',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${cormorant.variable} antialiased text-stone-800 bg-stone-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
