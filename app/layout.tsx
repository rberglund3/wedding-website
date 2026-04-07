import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-website-mu-nine.vercel.app/'), 
  title: "Rita & Wesley | October 24, 2026",
  description: "Join us for our wedding celebration in New York City.",
  openGraph: {
    title: "The Wedding of Rita & Wesley",
    description: "October 24, 2026 — New York City",
    url: 'https://wedding-website-mu-nine.vercel.app/',
    siteName: 'Rita and Wesley Wedding',
    images: [
      {
        url: '/images/363545_KW_306.jpg', // Path relative to the public folder
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

