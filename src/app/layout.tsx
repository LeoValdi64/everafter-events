import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EverAfter Events | Luxury Wedding & Event Planning",
  description:
    "EverAfter Events is a premier luxury wedding and event planning company. From intimate ceremonies to grand celebrations, we craft unforgettable experiences tailored to your unique vision. Over 500 weddings planned with 15+ years of excellence.",
  keywords: [
    "wedding planner",
    "event planning",
    "luxury weddings",
    "destination weddings",
    "corporate events",
    "floral design",
    "day-of coordination",
    "wedding coordinator",
  ],
  openGraph: {
    title: "EverAfter Events | Luxury Wedding & Event Planning",
    description:
      "From intimate ceremonies to grand celebrations, we craft unforgettable experiences tailored to your unique vision.",
    type: "website",
    locale: "en_US",
    siteName: "EverAfter Events",
  },
  twitter: {
    card: "summary_large_image",
    title: "EverAfter Events | Luxury Wedding & Event Planning",
    description:
      "From intimate ceremonies to grand celebrations, we craft unforgettable experiences tailored to your unique vision.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
