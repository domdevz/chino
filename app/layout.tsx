import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

import "@aws-amplify/ui-react/styles.css";

const inter = Inter({ subsets: ["latin"] });

const siteTitle = "Shuffle | Crypto Casino & Bitcoin Casino with Sportsbook";
const siteDescription =
  "Play the best crypto casino games at Shuffle VIP crypto casino. Play 10,000+ games, instant deposit, sportsbook, and the exclusive SHFL Lottery and more!";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Shuffle",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Shuffle preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
