import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

async function ConditionalNavbar() {
  const headersList = await headers();
  const isGated = headersList.get("x-site-gate") === "locked";

  if (isGated) {
    return null;
  }

  return <Navbar />;
}

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-website-mu-nine.vercel.app/'),
  title: "Rita & Wesley",
  description: "You're invited! Details inside.",
  openGraph: {
    title: "The Wedding of Rita & Wesley",
    description: "You're invited! Details inside.",
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
  robots: {
    index: false,
    follow: false,
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
        <Suspense fallback={null}>
          <ConditionalNavbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
